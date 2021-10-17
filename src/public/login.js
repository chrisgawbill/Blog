window.onload = () => {

    
    const loginSubmitBtn = document.getElementById("login_submit");
    const loginCancelBtn = document.getElementById("login_cancel");
    const loginEmailText = document.getElementById("login_email_text");
    const loginPasswordText = document.getElementById("login_password_text");

    loginSubmitBtn.onclick = () => {
        var adminRef = db.collection("Admin").doc("admin1");

        adminRef.get().then((admin) => {
            if (admin.exists) {
                let adminEmail = admin.Email;
                let adminPassword = admin.Password;
                alert("Document data:", doc.data());
            } else {
                alert("We could not fetch the admin credentials!");
            }
        }).catch((error) => {
            alert("Error getting document:", error);
        });
    }
    loginCancelBtn.onclick = () =>{
        let url = "http://localhost:8000/Home.html";
        location.assign(url);
    }
}