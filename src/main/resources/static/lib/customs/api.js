// ------------------------------ api list ------------------------------
const BASE_URL = "http://localhost:8080";
const API_LOGIN = `${BASE_URL}/api/v0/member`;
const API_CATEGORIES = `${BASE_URL}/api/v1/categories`;

// ------------------------------ api method ------------------------------
async function getCategoriesAPI() {
    const res = await fetch(API_CATEGORIES);
    if (!res.ok) throw new Error("Failed to getCategoriesAPI");
    return await res.json();
}

async function getArticlesByCategoryAPI(categoryId) {
    const res = await fetch(`${API_CATEGORIES}/${categoryId}/articles`);
    if (!res.ok) throw new Error("Failed to getArticlesByCategoryAPI");
    return await res.json();
}

async function getRecentArticlesAPI() {
}

async function loginAPI(payload) {
    const response = await fetch(
        API_LOGIN,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: payload
        }
    );

    if (!response.ok) throw Error("Failed to loginAPI");

    return response;
}