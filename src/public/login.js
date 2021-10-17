import { doc, getDoc } from "firebase/firestore";
window.onload = () => {

    
    const loginSubmitBtn = document.getElementById("login_submit");
    const loginCancelBtn = document.getElementById("login_cancel");
    const loginEmailText = document.getElementById("login_email_text");
    const loginPasswordText = document.getElementById("login_password_text");

    loginSubmitBtn.onclick = async() =>{
        const adminRef = doc(db, "Admins", "admin1");
        const adminSnap = await getDoc(adminRef);
        if(adminSnap.exists()){
            let adminEmail = adminSnap.Email;
            let adminPassword = adminSnap.Password;
            alert(adminSnap.data());
        }else{
            alert("Something happened and we could not retrieve credentials!");
        }
    }
    loginCancelBtn.onclick = () =>{
        let url = "http://localhost:8000/Home.html";
        location.assign(url);
    }
}