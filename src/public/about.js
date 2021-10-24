window.onload = () => {
    const addArticleBtn = document.getElementById("btn_add_article");
    const loginBtn = document.getElementById("btn_login");
    const logoutBtn = document.getElementById("btn_logout");
    const articleCancelBtn = document.getElementById("article_cancel_btn");
    const articleSubmitBtn = document.getElementById("article_submit_btn");

    const articleFormDiv = document.getElementById("article_form_div");

    const articleHeaderText = document.getElementById("article_header_input");
    const articleBodyText = document.getElementById("article_body_input");

    addArticleBtn.style.display = "none";
    logoutBtn.style.display = "none";
    articleFormDiv.style.display = "none";

    
    let cookie = document.cookie;
    if(cookie != null){
        let cookieArray = cookie.split(";");
        let adminStatus = cookieArray[0].split("=")[1];
        if(adminStatus === "verified"){
            addArticleBtn.style.display = "inline";
            logoutBtn.style.display = "inline";
            loginBtn.style.display = "none";
        }
    }

    loginBtn.onclick = () => {
        let url = "http://localhost:8000/Login.html";
        location.assign(url);
    }
    logoutBtn.onclick = () =>{
        let pastDate = new Date();
        pastDate.setMonth(pastDate.getDate() -1);
        document.cookie = "adminStatus=notverified;"
        document.cookie = "expires=" + pastDate.toUTCString() + ";";
        location.reload();
    }

    addArticleBtn.onclick = () =>{
        articleFormDiv.style.display = "inline";
    }
    articleCancelBtn.onclick = () =>{
        articleFormDiv.style.display = "none";
    }
    articleSubmitBtn.onclick = () =>{
        const date = new Date();
        let month = date.getMonth();
        let day = date.getDay();
        let year = date.getFullYear();
        let time = date.getTime();

        let articleHeader = articleHeaderText.value;
        let articleBody = articleBodyText.value;

        callUploadArticleAPI(month, day, year, time, articleHeader, articleBody);
    }
    const callUploadArticleAPI = (articleMonth, articleDay, articleYear, articleTime,  articleHeader, articleBody) => {
        $.ajax({
            url: 'uploadArticle/' + articleMonth + '/' + articleDay + "/" + articleYear + "/" + articleTime + "/" + articleHeader + "/" + articleBody, success: function (res) {
                if(!(res === 'error')){
                    console.log("Success");
                    location.reload();
                }else{
                    console.log("Error");
                }
            }
        });
    }

}
