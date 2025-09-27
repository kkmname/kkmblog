/**
 * tiptap.custom.js
 * Tiptap 에디터 초기화 및 툴바 구성
 * - InvisibleCharacters 공백/코드블록 통합 처리
 * - 체크리스트, 툴바, 기타 확장 포함
 */

(function (window) {
  'use strict';

  const Tiptap = window.Tiptap || {};

  if (!Tiptap.Editor) {
    console.error('[Tiptap Custom] Tiptap 번들이 로드되지 않았습니다.');
    return;
  }

  // ===== 유틸리티 =====
  const Utils = {
    createElement(tag, className, textContent) {
      const el = document.createElement(tag);
      if (className) el.className = className;
      if (textContent) el.textContent = textContent;
      return el;
    },

    createButton(label, onClick, checkActive, checkDisabled) {
      const btn = this.createElement('button', 'tiptap-btn', label);
      btn._bind = (editor, refresh) => {
        btn.onclick = (e) => {
          e.preventDefault();
          onClick(editor);
          refresh();
        };
        btn.update = () => {
          btn.classList.toggle('is-active', !!checkActive?.(editor));
          btn.disabled = !!checkDisabled?.(editor);
        };
      };
      return btn;
    },

    createButtonGroup(...buttons) {
      const group = this.createElement('div', 'tiptap-group');
      buttons.forEach((btn) => group.appendChild(btn));
      return group;
    },

    prompt(message, defaultValue = '') {
      return window.prompt(message, defaultValue);
    },
  };

  // ===== 툴바 구성 =====
  const Toolbar = {
    build(editor, refresh) {
      const makeBtn = (label, cmd, isActive) =>
        Utils.createButton(label, cmd, isActive);

      const buttons = [
        // 문단 & 헤딩
        Utils.createButtonGroup(
          makeBtn('P', (ed) => ed.chain().focus().setParagraph().run(), (ed) =>
            ed.isActive('paragraph')
          ),
          makeBtn('H1', (ed) => ed.chain().focus().toggleHeading({ level: 1 }).run(), (ed) =>
            ed.isActive('heading', { level: 1 })
          ),
          makeBtn('H2', (ed) => ed.chain().focus().toggleHeading({ level: 2 }).run(), (ed) =>
            ed.isActive('heading', { level: 2 })
          ),
          makeBtn('H3', (ed) => ed.chain().focus().toggleHeading({ level: 3 }).run(), (ed) =>
            ed.isActive('heading', { level: 3 })
          )
        ),

        // 텍스트 스타일
        Utils.createButtonGroup(
          makeBtn('B', (ed) => ed.chain().focus().toggleBold().run(), (ed) =>
            ed.isActive('bold')
          ),
          makeBtn('I', (ed) => ed.chain().focus().toggleItalic().run(), (ed) =>
            ed.isActive('italic')
          ),
          makeBtn('U', (ed) => ed.chain().focus().toggleUnderline().run(), (ed) =>
            ed.isActive('underline')
          ),
          makeBtn('S', (ed) => ed.chain().focus().toggleStrike().run(), (ed) =>
            ed.isActive('strike')
          ),
          makeBtn('Code', (ed) => ed.chain().focus().toggleCode().run(), (ed) =>
            ed.isActive('code')
          )
        ),

        // 목록
        Utils.createButtonGroup(
          makeBtn('• List', (ed) => ed.chain().focus().toggleBulletList().run(), (ed) =>
            ed.isActive('bulletList')
          ),
          makeBtn('1. List', (ed) => ed.chain().focus().toggleOrderedList().run(), (ed) =>
            ed.isActive('orderedList')
          ),
          makeBtn('[ ] Task', (ed) => ed.chain().focus().toggleTaskList().run(), (ed) =>
            ed.isActive('taskList')
          )
        ),

        // 기타
        Utils.createButtonGroup(
          makeBtn('Quote', (ed) => ed.chain().focus().toggleBlockquote().run(), (ed) =>
            ed.isActive('blockquote')
          ),
          makeBtn('HR', (ed) => ed.chain().focus().setHorizontalRule().run())
        ),

        // 링크 & 이미지
        Utils.createButtonGroup(
          Utils.createButton(
            'Link',
            (ed) => {
              const url = Utils.prompt('링크 URL 입력:');
              if (url) ed.chain().focus().setLink({ href: url }).run();
            },
            (ed) => ed.isActive('link')
          ),
          Utils.createButton('Unlink', (ed) => ed.chain().focus().unsetLink().run()),
          Utils.createButton('Image', (ed) => {
            const url = Utils.prompt('이미지 URL 입력:');
            if (url) ed.chain().focus().setImage({ src: url }).run();
          })
        )
      ];

      // 컨테이너 조립
      const container = Utils.createElement('div', 'tiptap-toolbar');
      buttons.forEach((b) => container.appendChild(b));

      // 버튼 바인딩
      buttons.flatMap((g) => Array.from(g.children)).forEach((btn) => {
        if (btn._bind) btn._bind(editor, refresh);
      });

      return container;
    },
  };

  // ===== 에디터 초기화 =====
  function initTiptap({ el, content = '', extensions = [] }) {
    const editor = new Tiptap.Editor({
      element: el,
      content,
      extensions: [
        Tiptap.StarterKit,
        Tiptap.Highlight,
        Tiptap.Color,
        Tiptap.TextStyle,
        Tiptap.Image,
        Tiptap.TaskList,
        Tiptap.TaskItem,
        Tiptap.Table,
        Tiptap.TableRow,
        Tiptap.TableHeader,
        Tiptap.TableCell,
        Tiptap.CharacterCount,
        Tiptap.FontFamily,
        Tiptap.TextAlign,
        Tiptap.Typography,
        Tiptap.UniqueId,
        // Tiptap.InvisibleCharacters,
        Tiptap.FileHandler,
        Tiptap.DragHandle,
        Tiptap.BubbleMenu,
        Tiptap.FloatingMenu,
        Tiptap.TableOfContents,
        ...extensions,
      ].filter(Boolean),
    });

    // ===== 코드 블록 내부 공백/텍스트 merge 처리 (추가 안전장치) =====
    editor.on('update', () => {
      // 기존에 생성된 공백 span 제거
      const dom = editor.view.dom;
      dom.querySelectorAll('span.tiptap-invisible-character--space').forEach(span => span.remove());

      // code/code_block 내부에서 여러 자식 merge
      const tr = editor.state.tr;
      let modified = false;
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'code_block' || node.type.name === 'code') {
          if (node.childCount > 1) {
            tr.replaceWith(pos, pos + node.nodeSize, node.type.create({}, node.textContent));
            modified = true;
          }
        }
      });
      if (modified) editor.view.dispatch(tr);
    });

    // 툴바 초기화
    const toolbar = Toolbar.build(editor, () => editor.chain().focus().run());
    el.parentNode.insertBefore(toolbar, el);

    return editor;
  }

  // 전역 바인딩
  window.TiptapCustom = { init: initTiptap };
})(window);
