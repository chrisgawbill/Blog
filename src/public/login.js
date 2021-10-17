window.onload = () => {

    const loginSubmitBtn = document.getElementById("login_submit");
    const loginCancelBtn = document.getElementById("login_cancel");
    const loginEmailText = document.getElementById("login_email_text");
    const loginPasswordText = document.getElementById("login_password_text");

    loginSubmitBtn.onclick = () =>{
        let email = loginEmailText.value;
        let password = loginPasswordText.value;
        callLoginAPI(email, password)
    }
    loginCancelBtn.onclick = () =>{
        let url = "http://localhost:8000/Home.html";
        location.assign(url);
    }
    const callLoginAPI = (loginEmail, loginPassword) => {
        $.ajax({
            url: 'checkLogin/' + loginEmail + '/' + loginPassword, success: function (res) {
                if(!(res === 'error')){
                    alert("Success");
                }
            }
        });
    }
}