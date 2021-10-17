window.onload = () => {

    const loginSubmitBtn = document.getElementById("login_submit");
    const loginCancelBtn = document.getElementById("login_cancel");
    const loginEmailText = document.getElementById("login_email_input");
    const loginPasswordText = document.getElementById("login_password_input");

    loginSubmitBtn.onclick = () =>{
        let email = loginEmailText.value;
        let password = loginPasswordText.value;
        console.log(email + password);
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
                    console.log("Success");
                }else{
                    console.log("Error");
                }
            }
        });
    }
}