window.onload = () => {
    const addArticleBtn = document.getElementById("btn_add_article");
    const loginBtn = document.getElementById("btn_login");

    addArticleBtn.style.display = "none";

    loginBtn.onclick = () => {
        let url = "http://localhost:8000/Login.html";
        location.assign(url);
    }
}