// ------------------------------ api list ------------------------------
const BASE_URL = "http://localhost:8080";
const API_LOGIN = `${BASE_URL}/api/v0/member`;

// ------------------------------ api method ------------------------------
export async function loginAPI(payload) {
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