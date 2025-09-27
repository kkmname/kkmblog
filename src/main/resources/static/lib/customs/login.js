// ------------------------------ 이벤트 핸들러 ------------------------------
async function handleSubmit() {
    try {
      const form = document.querySelector("form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const payload = new URLSearchParams();
        payload.append("username", email);
        payload.append("password", password);

        const member = await loginAPI(payload);
        if (member) {
            window.location.href = "/admin";
        }
      })
    } catch (err) {

    }
}

// ------------------------------ 초기화 ------------------------------
async function init() {
    handleSubmit();
}

// ------------------------------ DOMContentLoaded ------------------------------
document.addEventListener("DOMContentLoaded", init);