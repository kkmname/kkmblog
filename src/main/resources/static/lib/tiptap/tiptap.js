// /tiptap.init.js
(function () {
  const {
    Editor, StarterKit,
    // StarterKit에 없는 확장만 추가
    Underline, Highlight, Color, TextStyle,
    Link, Image,
    TaskList, TaskItem,
    Table, TableRow, TableHeader, TableCell,
    CharacterCount, FontFamily, TextAlign,
    Typography, UniqueId, InvisibleCharacters,
    FileHandler, DragHandle,
    BubbleMenu, FloatingMenu, TableOfContents,
  } = window.Tiptap || {};

  if (!Editor) {
    console.error('[tiptap.init] window.Tiptap가 없음. tiptap.bundle.js 경로 확인');
    return;
  }

  /* ===== UI helpers ===== */
  const mkBtn = (label, onClick, isActive, isDisabled) => {
    const el = document.createElement('button');
    el.className = 'tt-btn';
    el.textContent = label;
    el._bind = (editor, refresh) => {
      el.onclick = (e) => { e.preventDefault(); onClick(editor); refresh(); };
      el.update = () => {
        el.classList.toggle('is-active', !!isActive?.(editor));
        el.disabled = !!isDisabled?.(editor);
      };
    };
    return el;
  };
  const mkGroup = (...btns) => {
    const g = document.createElement('div');
    g.className = 'tt-group';
    btns.forEach(b => g.appendChild(b));
    return g;
  };
  const ask = (msg, defVal='') => window.prompt(msg, defVal);

  /* ===== Public API ===== */
  window.initTiptapWithToolbar = function ({
    mountSelector = '#pm',
    toolbarSelector = '#tb',
    counterSelector = '#cnt',
    placeholder = '내용을 입력하세요...',
    content = '<p></p>',
    disableContextMenu = true,
    privacy = false,
    disableTypography = true, // 기본: 자동 치환 꺼두기
  } = {}) {
    const mount = document.querySelector(mountSelector);
    const toolbar = document.querySelector(toolbarSelector);
    const counter = counterSelector ? document.querySelector(counterSelector) : null;
    const host = toolbar?.closest('.tt-editor') || mount?.closest('.tt-editor');
    if (!mount || !toolbar) {
      console.error('[tiptap.init] mount/toolbar 선택자 점검 필요', { mountSelector, toolbarSelector });
      return null;
    }

    // 1) 메뉴 DOM 선생성
    const bubbleEl = buildBubbleMenuSkeleton();
    const floatingEl = buildFloatingMenuSkeleton();

    // 2) 확장 구성
    const extensions = [
      StarterKit.configure({ heading: { levels: [1,2,3,4,5,6] } }),
      // marks / inline
      Underline, Highlight, Color, TextStyle,
      FontFamily.configure({ types: ['textStyle'] }),
      Link.configure({ autolink: true, openOnClick: false }),
      // nodes
      Image,
      TaskList, TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }), TableRow, TableHeader, TableCell,
      // behavior
      CharacterCount,
      TextAlign.configure({
        types: ['heading','paragraph'],
        alignments: ['left','center','right','justify'],
        defaultAlignment: 'left',
      }),
      UniqueId,
      // InvisibleCharacters: 기본은 off로 시작할 거라 그대로 추가
      InvisibleCharacters.configure({ renderHardBreak: false }),
      DragHandle,
      FileHandler.configure({
        allowedMimeTypes: ['image/jpeg','image/png','image/webp','image/gif','image/svg+xml'],
        onDrop: (ed, files) => handleFiles(ed, files),
        onPaste: (ed, files) => handleFiles(ed, files),
      }),
      TableOfContents.configure({
        getHeadingId: (node) => node.attrs?.id ?? '',
      }),
      BubbleMenu.configure({
        element: bubbleEl,
        shouldShow: ({ editor, state }) => {
          if (!editor.view.hasFocus()) return false;
          if (editor.isActive('codeBlock')) return false;
          const { from, to } = state.selection;
          return to > from; // 선택 범위 있을 때만
        },
        tippyOptions: { duration: 120, placement: 'top', offset: [0, 10], zIndex: 9999 },
      }),
      FloatingMenu.configure({
        element: floatingEl,
        shouldShow: () => false, // 기본 비표시
        tippyOptions: { duration: 120, placement: 'right-start', offset: [0, 10], zIndex: 9999 },
      }),
    ];
    if (!disableTypography && Typography) {
      extensions.push(Typography); // 필요할 때만 켜기(—, … 등 자동 치환)
    }

    // 3) Editor 생성
    const editor = new Editor({
      element: mount,
      content,
      editorProps: {
        attributes: { class: 'ProseMirror', 'data-placeholder': placeholder }
      },
      extensions,
      onUpdate: () => refresh(),
      onSelectionUpdate: () => refresh(),
    });

    // 4) 옵션: 우클릭 차단 / 프라이버시 모드 / ¶ 기본 OFF
    const pmRoot = editor.view.dom;
    if (disableContextMenu) pmRoot.addEventListener('contextmenu', e => e.preventDefault());

    function setPrivacyMode(on) {
      if (!host) return;
      host.classList.toggle('tt-private', !!on);
      if (on) {
        pmRoot.addEventListener('copy', prevent, true);
        pmRoot.addEventListener('cut', prevent, true);
      } else {
        pmRoot.removeEventListener('copy', prevent, true);
        pmRoot.removeEventListener('cut', prevent, true);
      }
    }
    function prevent(e){ e.preventDefault(); }
    if (privacy) setPrivacyMode(true);
    editor.setPrivacyMode = setPrivacyMode;

    // InvisibleCharacters가 기본 ON이면 한 번 꺼두기
    if (editor.isActive?.('invisibleCharacters')) {
      editor.commands.toggleInvisibleCharacters();
    }

    // 5) 툴바 구성
    toolbar.innerHTML = '';

    // marks
    const bBold   = mkBtn('B',  ed => ed.chain().focus().toggleBold().run(),      ed => ed.isActive('bold'));
    const bItalic = mkBtn('I',  ed => ed.chain().focus().toggleItalic().run(),    ed => ed.isActive('italic'));
    const bStrike = mkBtn('S̶', ed => ed.chain().focus().toggleStrike().run(),    ed => ed.isActive('strike'));
    const bUnder  = mkBtn('U̲', ed => ed.chain().focus().toggleUnderline().run(), ed => ed.isActive('underline'));
    const bCode   = mkBtn('<>', ed => ed.chain().focus().toggleCode().run(),      ed => ed.isActive('code'));
    const bHL     = mkBtn('HL', ed => ed.chain().focus().toggleHighlight().run(), ed => ed.isActive('highlight'));
    const bColor  = mkBtn('Color', ed => {
      const v = ask('CSS color (예: #ef4444, red)');
      if (v) ed.chain().focus().setColor(v).run();
    }, null, ed => !ed.can().setColor?.('#000'));

    // font-family select
    const ffSelect = document.createElement('select');
    ffSelect.className = 'tt-btn';
    ['system-ui','Inter,ui-sans-serif','Noto Sans KR','Menlo,ui-monospace','serif']
      .forEach(f => { const o = document.createElement('option'); o.value=f; o.textContent=f; ffSelect.appendChild(o); });
    ffSelect.onchange = () => editor.chain().focus().setFontFamily(ffSelect.value).run();

    // blocks
    const bP  = mkBtn('P',  ed => ed.chain().focus().setParagraph().run(), ed => ed.isActive('paragraph'));
    const bH1 = mkBtn('H1', ed => ed.chain().focus().toggleHeading({level:1}).run(), ed => ed.isActive('heading',{level:1}));
    const bH2 = mkBtn('H2', ed => ed.chain().focus().toggleHeading({level:2}).run(), ed => ed.isActive('heading',{level:2}));
    const bH3 = mkBtn('H3', ed => ed.chain().focus().toggleHeading({level:3}).run(), ed => ed.isActive('heading',{level:3}));
    const bCB = mkBtn('{ }', ed => ed.chain().focus().toggleCodeBlock().run(), ed => ed.isActive('codeBlock'));
    const bBQ = mkBtn('❝',  ed => ed.chain().focus().toggleBlockquote().run(), ed => ed.isActive('blockquote'));
    const bHR = mkBtn('—',  ed => ed.chain().focus().setHorizontalRule().run());
    const bBR = mkBtn('⏎',  ed => ed.chain().focus().setHardBreak().run());

    // align
    const bAL = mkBtn('⟸', ed => ed.chain().focus().setTextAlign('left').run(),    ed => ed.isActive({textAlign:'left'}));
    const bAC = mkBtn('⇔',  ed => ed.chain().focus().setTextAlign('center').run(),  ed => ed.isActive({textAlign:'center'}));
    const bAR = mkBtn('⟹', ed => ed.chain().focus().setTextAlign('right').run(),   ed => ed.isActive({textAlign:'right'}));
    const bAJ = mkBtn('≋',  ed => ed.chain().focus().setTextAlign('justify').run(), ed => ed.isActive({textAlign:'justify'}));

    // lists
    const bUL = mkBtn('• List', ed => ed.chain().focus().toggleBulletList().run(),  ed => ed.isActive('bulletList'));
    const bOL = mkBtn('1. List', ed => ed.chain().focus().toggleOrderedList().run(), ed => ed.isActive('orderedList'));
    const bTL = mkBtn('☑ Task', ed => ed.chain().focus().toggleTaskList().run(),     ed => ed.isActive('taskList'));
    const bInd = mkBtn('→', ed => ed.chain().focus().sinkListItem('listItem').run(), null, ed => !ed.can().sinkListItem('listItem'));
    const bOut = mkBtn('←', ed => ed.chain().focus().liftListItem('listItem').run(),  null, ed => !ed.can().liftListItem('listItem'));

    // link / image
    const bLink = mkBtn('Link', ed => {
      const url = ask('URL 입력');
      if (url) ed.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, ed => ed.isActive('link'));
    const bUnLink = mkBtn('Unlink', ed => ed.chain().focus().unsetLink().run(), null, ed => !ed.isActive('link'));
    const bImg = mkBtn('Img', async ed => {
      const useFile = confirm('이미지 파일 업로드? "취소"는 URL 입력');
      if (useFile) {
        const input = document.createElement('input');
        input.type='file'; input.accept='image/*';
        input.onchange = async () => {
          const f = input.files?.[0]; if (!f) return;
          const url = await fileToDataURL(f);
          ed.chain().focus().setImage({ src: url }).run();
        };
        input.click();
      } else {
        const src = ask('이미지 URL');
        if (src) ed.chain().focus().setImage({ src }).run();
      }
    });

    // table
    const bTIns = mkBtn('Tbl+', ed => ed.chain().focus().insertTable({rows:3, cols:3, withHeaderRow:true}).run());
    const bTDel = mkBtn('Tbl-', ed => ed.chain().focus().deleteTable().run(), null, ed => !ed.isActive('table'));
    const bCAddL = mkBtn('Col+',  ed => ed.chain().focus().addColumnBefore().run(), null, ed => !ed.isActive('table'));
    const bCAddR = mkBtn('Col++', ed => ed.chain().focus().addColumnAfter().run(),  null, ed => !ed.isActive('table'));
    const bCDel  = mkBtn('Col-',  ed => ed.chain().focus().deleteColumn().run(),    null, ed => !ed.isActive('table'));
    const bRAddA = mkBtn('Row+',  ed => ed.chain().focus().addRowBefore().run(),    null, ed => !ed.isActive('table'));
    const bRAddB = mkBtn('Row++', ed => ed.chain().focus().addRowAfter().run(),     null, ed => !ed.isActive('table'));
    const bRDel  = mkBtn('Row-',  ed => ed.chain().focus().deleteRow().run(),       null, ed => !ed.isActive('table'));
    const bHRow  = mkBtn('TH Row',  ed => ed.chain().focus().toggleHeaderRow().run(),    null, ed => !ed.isActive('table'));
    const bHCol  = mkBtn('TH Col',  ed => ed.chain().focus().toggleHeaderColumn().run(), null, ed => !ed.isActive('table'));
    const bHCel  = mkBtn('TH Cell', ed => ed.chain().focus().toggleHeaderCell().run(),   null, ed => !ed.isActive('table'));
    const bMerge = mkBtn('Merge',   ed => ed.chain().focus().mergeCells().run(),         null, ed => !ed.can().mergeCells());
    const bSplit = mkBtn('Split',   ed => ed.chain().focus().splitCell().run(),          null, ed => !ed.can().splitCell());

    // misc
    const bTOC  = mkBtn('TOC', ed => {
      const hasTOC = ed.getJSON().content?.some(n => n.type === 'tableOfContents');
      if (!hasTOC) ed.chain().focus().insertContentAt(0, { type: 'tableOfContents' }).run();
    });
    const bInv  = mkBtn('¶', ed => ed.chain().focus().toggleInvisibleCharacters().run(), ed => ed.isActive('invisibleCharacters'));

    // 렌더 + 바인딩
    toolbar.appendChild(mkGroup(bBold, bItalic, bStrike, bUnder, bCode, bHL, bColor));
    const ffWrap = document.createElement('div'); ffWrap.className='tt-group'; ffWrap.appendChild(ffSelect); toolbar.appendChild(ffWrap);
    toolbar.appendChild(mkGroup(bAL, bAC, bAR, bAJ));
    toolbar.appendChild(mkGroup(bP, bH1, bH2, bH3, bCB, bBQ, bHR, bBR));
    toolbar.appendChild(mkGroup(bUL, bOL, bTL, bInd, bOut));
    toolbar.appendChild(mkGroup(bLink, bUnLink, bImg));
    toolbar.appendChild(mkGroup(bTIns, bTDel, bCAddL, bCAddR, bCDel, bRAddA, bRAddB, bRDel, bHRow, bHCol, bHCel, bMerge, bSplit));
    toolbar.appendChild(mkGroup(bTOC, bInv));

    function refresh() {
      if (host) host.querySelectorAll('.tt-btn').forEach(b => b.update?.());
      if (counter) counter.textContent = `${editor.storage.characterCount.characters()} chars`;
    }
    host?.querySelectorAll('.tt-btn').forEach(b => b._bind?.(editor, refresh));
    bubbleEl.querySelectorAll('.tt-btn').forEach(b => b._bind?.(editor, refresh));
    floatingEl.querySelectorAll('.tt-btn').forEach(b => b._bind?.(editor, refresh));
    refresh();

    // 파일 헬퍼
    async function fileToDataURL(file) {
      const reader = new FileReader();
      return new Promise((res, rej) => {
        reader.onerror = rej;
        reader.onload = () => res(String(reader.result));
        reader.readAsDataURL(file);
      });
    }
    async function handleFiles(ed, files) {
      for (const f of files) {
        if (!f.type?.startsWith?.('image/')) continue;
        const url = await fileToDataURL(f);
        ed.chain().focus().insertContent({ type: 'image', attrs: { src: url } }).run();
      }
      return true;
    }

    // 메뉴 스켈레톤
    function buildBubbleMenuSkeleton() {
      const el = document.createElement('div');
      el.className = 'tt-toolbar'; el.style.borderRadius = '10px';
      const bB = mkBtn('B',  ed => ed.chain().focus().toggleBold().run(),      ed => ed.isActive('bold'));
      const bI = mkBtn('I',  ed => ed.chain().focus().toggleItalic().run(),    ed => ed.isActive('italic'));
      const bU = mkBtn('U',  ed => ed.chain().focus().toggleUnderline().run(), ed => ed.isActive('underline'));
      const bL = mkBtn('Link', ed => {
        const url = ask('URL 입력');
        if (url) ed.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }, ed => ed.isActive('link'));
      el.appendChild(mkGroup(bB, bI, bU, bL));
      return el;
    }
    function buildFloatingMenuSkeleton() {
      const el = document.createElement('div');
      el.className = 'tt-toolbar'; el.style.borderRadius = '10px';
      const bH2f = mkBtn('H2', ed => ed.chain().focus().toggleHeading({ level: 2 }).run(), ed => ed.isActive('heading', { level: 2 }));
      const bQf  = mkBtn('❝', ed => ed.chain().focus().toggleBlockquote().run(), ed => ed.isActive('blockquote'));
      const bCb  = mkBtn('{ }', ed => ed.chain().focus().toggleCodeBlock().run(), ed => ed.isActive('codeBlock'));
      el.appendChild(mkGroup(bH2f, bQf, bCb));
      return el;
    }

    return editor;
  };
})();
