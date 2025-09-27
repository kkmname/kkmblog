// ------------------------------ DOM 생성 ------------------------------
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
            a.href = "#"; // 이동 방지
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
    const articlesContainer = document.querySelector(".articles ol");
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

function createArticleContent(articleId) {
    const articlesContainer = document.querySelector(".articles ol");
    articlesContainer.innerHTML = "";
    
    console.log("click: " + articleId);
}

// ------------------------------ 이벤트 핸들러 ------------------------------
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
        createArticleContent(articleId);
    } catch (err) {
        console.error("Error loading articles:", err);
    }
}

// ------------------------------ 초기화 ------------------------------
async function init() {
    initCategories();
    // initArticles();
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

async function initArticles() {
    try {
        const articles = await getRecentArticlesAPI();
        const articlesContainer = document.querySelector(".articles ol");
        articlesContainer.innerHTML = "";
        articlesContainer.appendChild(createArticleList(articles), handleArticleClick);
    } catch (err) {
        console.error("Error loading articles:", err);
    }
}


// ------------------------------ DOMContentLoaded ------------------------------
document.addEventListener("DOMContentLoaded", init);
