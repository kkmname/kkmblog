// ------------------------------ 전역 변수 ------------------------------
let editor;

// ------------------------------ DOM 생성 ------------------------------
function createManagementList() {
    // ---------- category management ----------
    const category = document.createElement("li");
    const category_link = document.createElement("a");
    category_link.textContent = "Category";
    category_link.href = "#";
    category_link.addEventListener("click", (e) => {
        e.preventDefault();
        handleManagementClick("category")
    });
    category.appendChild(category_link);

    // ---------- article management ----------
    const article = document.createElement("li");
    const article_link = document.createElement("a");
    article_link.textContent = "Article";
    article_link.href = "#";
    article_link.addEventListener("click", (e) => {
        e.preventDefault();
        handleManagementClick("article")
    });
    article.appendChild(article_link);

    // ---------- Managements ----------
    const managements = document.createElement("ul");
    managements.appendChild(category);
    managements.appendChild(article);

    return managements;
}

function createCategoryManagement() {
    // ---------- clear ----------
    initContentSection();

    // ---------- search ----------
    const search_label = document.createElement("label");
    search_label.textContent = "search";
    search_label.htmlFor = "keyword";
    
    const search_input = document.createElement("input");
    search_input.id = "keyword";
    search_input.name = "keyword";
    search_input.type = "text";
    search_input.placeholder = "Please enter the name of the category correctly.";

    const search_button = document.createElement("button");
    search_button.textContent = "search";
    search_button.className = "btn btn-default btn-ghost";

    const flexLine = document.createElement("div");
    flexLine.className = "btn-block";
    flexLine.appendChild(search_input);
    flexLine.appendChild(search_button);

    // ---------- content section ----------
    const contentContainer = document.querySelector(".content");
    contentContainer.appendChild(search_label);
    contentContainer.appendChild(flexLine);
}

async function createArticleManagement() {
    // ---------- clear ----------
    initContentSection();

    // ---------- category selector label ----------
    const category_selector_label = document.createElement("label");
    category_selector_label.textContent = "Category:";
    category_selector_label.htmlFor = "categoryId";

    const category_selector = document.createElement("select");
    category_selector.id = "categoryId";
    category_selector.name = "categoryId";

    // ---------- category selector options ----------
    const categories = await getCategoriesAPI();
    const map = {};
    categories.forEach(cat => map[cat.id] = { ...cat, children: []});
    
    const roots = [];
    categories.forEach(cat => {
        if (cat.parentId === null) roots.push(map[cat.id]);
        else if (map[cat.parentId]) map[cat.parentId].children.push(map[cat.id]);
    });

    function appendOptions(items, depth = 0) {
        items.forEach(item => {
            const option = document.createElement("option");
            option.textContent = `${"─".repeat(depth)}${item.title}`;
            option.value = item.id;
            category_selector.appendChild(option);

            if (item.children.length > 0) {
                appendOptions(item.children, depth + 1);
            }
        });
    }
    appendOptions(roots);

    // ---------- title ----------
    const article_title_label = document.createElement("label");
    article_title_label.textContent = "Title:";
    article_title_label.htmlFor = "title";

    const article_title_input = document.createElement("input");
    article_title_input.type = "text";
    // article_title_input.id = "title";
    article_title_input.name = "title";
    article_title_input.setAttribute("required", "true");

    // ---------- content ----------
    const article_content_label = document.createElement("label");
    article_content_label.textContent = "Content:";
    article_content_label.htmlFor = "content";

    // ---------- Tiptap 에디터 컨테이너 ----------
    const tt_editor_wrapper = document.createElement("div");
    tt_editor_wrapper.className = "tiptap-editor";
    tt_editor_wrapper.id = "tiptap-editor";

    // 툴바
    const tt_toolbar = document.createElement("div");
    tt_toolbar.id = "tb";
    tt_toolbar.className = "tt-toolbar";
    
    // 에디터 마운트 포인트
    const tt_mount = document.createElement("div");
    tt_mount.id = "pm";
    
    // 하단 상태바
    const tt_foot = document.createElement("div");
    tt_foot.className = "tt-foot";
    
    const tt_counter = document.createElement("span");
    tt_counter.id = "cnt";
    tt_counter.className = "tt-chip";
    
    tt_foot.appendChild(tt_counter);
    
    // 에디터 래퍼에 추가
    tt_editor_wrapper.appendChild(tt_toolbar);
    tt_editor_wrapper.appendChild(tt_mount);
    tt_editor_wrapper.appendChild(tt_foot);

    // ---------- 저장 버튼 ----------
    const save_button = document.createElement("button");
    save_button.textContent = "Save Article";
    save_button.className = "btn btn-primary btn-block";
    save_button.style.marginTop = "20px";
    save_button.addEventListener("click", async () => {
        const categoryId = category_selector.value;
        const title = article_title_input.value;
        const content = editor.getHTML(); // Tiptap에서 HTML 가져오기
        
        if (!categoryId || !title || !content) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        
        try {
            // API 호출 로직 추가
            const result = await saveArticleAPI({
                categoryId,
                title,
                content
            });
            alert("저장되었습니다!");
        } catch (err) {
            console.error("Error saving article:", err);
            alert("저장에 실패했습니다.");
        }
    });

    // ---------- content section ----------
    const contentContainer = document.querySelector(".content");
    contentContainer.appendChild(category_selector_label);
    contentContainer.appendChild(category_selector);
    contentContainer.appendChild(document.createElement("br"));
    contentContainer.appendChild(document.createElement("br"));
    contentContainer.appendChild(article_title_label);
    contentContainer.appendChild(article_title_input);
    contentContainer.appendChild(document.createElement("br"));
    contentContainer.appendChild(document.createElement("br"));
    contentContainer.appendChild(article_content_label);
    contentContainer.appendChild(tt_editor_wrapper);
    contentContainer.appendChild(save_button);

    // ---------- Tiptap 초기화 ----------
    const editor = TiptapCustom.init({
        el: document.querySelector('#tiptap-editor')
    });
    // if (typeof window.initTiptapWithToolbar === 'function') {
    //     editor = window.initTiptapWithToolbar({
    //         mountSelector: '#pm',
    //         toolbarSelector: '#tb',
    //         counterSelector: '#cnt',
    //         placeholder: '내용을 입력하세요...',
    //         content: '<p></p>',
    //         disableContextMenu: false,
    //         privacy: false,
    //         disableTypography: true
    //     });
    // } else {
    //     console.error('initTiptapWithToolbar 함수를 찾을 수 없습니다. tiptap.sample.js가 로드되었는지 확인하세요.');
    // }
}

function createCategoryList(categories, handleClick) {
    const map = {};
    categories.forEach(cat => map[cat.id] = { ...cat, children: [] });

    const roots = [];
    categories.forEach(cat => {
        if (cat.parentId === null) roots.push(map[cat.id]);
        else if (map[cat.parentId]) map[cat.parentId].children.push(map[cat.id]);
    });

    function buildList(items) {
        const ul = document.createElement("ul");
        items.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = item.title;
            a.href = "#";
            a.addEventListener("click", (e) => {
                e.preventDefault();
                handleClick(item.id);
            });

            li.appendChild(a);

            if (item.children.length > 0) {
                li.appendChild(buildList(item.children));
            }

            ul.appendChild(li);
        });
        return ul;
    }

    return buildList(roots);
}

function createArticleList(articles, handleClick) {
    const articlesContainer = document.querySelector(".content ol");
    articlesContainer.innerHTML = "";
    
    articles.forEach(article => {
        const li = document.createElement("li");
        li.dataset.date = article.createdDate.split("T")[0] || "";
        const a = document.createElement("a");
        a.textContent = article.title;
        a.href = "#";
        a.addEventListener("click", (e) => {
            e.preventDefault();
            handleClick(article.id);
        });
        li.appendChild(a);
        articlesContainer.appendChild(li);
    });
}

// ------------------------------ 이벤트 핸들러 ------------------------------
async function handleManagementClick(managementId) {
    switch (managementId) {
        case "category":
            createCategoryManagement();
            break;
        case "article":
            createArticleManagement();
            break;
    }
}

async function handleCategoryClick(categoryId) {
    try {
        const articles = await getArticlesByCategoryAPI(categoryId);
        createArticleList(articles, handleArticleClick);
    } catch (err) {
        console.error("Error loading articles:", err);
    }
}

async function handleArticleClick(articleId) {
    try {
        // 아티클 상세 보기 또는 편집 로직
        const article = await getArticleByIdAPI(articleId);
        
        // 편집 모드로 전환
        await createArticleManagement();
        
        // 기존 데이터 로드
        document.getElementById('categoryId').value = article.categoryId;
        document.getElementById('title').value = article.title;
        
        // 에디터에 내용 설정
        if (editor) {
            editor.commands.setContent(article.content);
        }
    } catch (err) {
        console.error("Error loading article:", err);
    }
}

// ------------------------------ 초기화 ------------------------------
async function init() {
    initManagements();
    initCategories();
}

async function initManagements() {
    try {
        const managementsContainer = document.querySelector(".managements nav ul");
        managementsContainer.innerHTML = "";
        managementsContainer.appendChild(createManagementList(handleManagementClick));
    } catch (err) {
        console.error("Error loading managements:", err);
    }
}

async function initCategories() {
    try {
        const categories = await getCategoriesAPI();
        const categoriesContainer = document.querySelector(".categories nav ul");
        categoriesContainer.innerHTML = "";
        categoriesContainer.appendChild(createCategoryList(categories, handleCategoryClick));
    } catch (err) {
        console.error("Error loading categories:", err);
    }
}

async function initContentSection() {
    const contentSection = document.querySelector(".content");
    contentSection.innerHTML = "";
    
    // 에디터 정리
    if (editor) {
        editor.destroy();
        editor = null;
    }
}

// ------------------------------ DOMContentLoaded ------------------------------
document.addEventListener("DOMContentLoaded", init);