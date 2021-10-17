const express = require('express');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

const port = process.env.PORT || 8000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
class Admin {
    constructor(email, password){
        this.email = email;
        this.password = password;
    }
    toString(){
        return this.email + " , " + this.password;
    }
}
let adminConverter = {
    toFirestore: function(admin){
        return{
            Email: admin.email,
            Password: admin.password
        };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Admin(data.Email, data.Password);
    }
};
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/home.html');
});
app.get('/Home.html', function(req,res){
    res.sendFile(__dirname + "/public/home.html")
});
app.get('/Archive.html', function(req, res){
    res.sendFile(__dirname + "/public/archive.html");
});
app.get('/About.html', function(req, res){
    res.sendFile(__dirname + "/public/about.html");
});
app.get('/Login.html', function(req, res){
    res.sendFile(__dirname + "/public/login.html");
});
app.get('/checkLogin/:email/:password', function(req, res){
    db.collection("Admins").doc("admin1").withConverter(adminConverter).get().then(doc => {
        if(!doc.exists){
            console.log("No document exists");
        }else{
            let admin = doc.data();
            if(req.params.email === admin.email && req.params.password === admin.password){
                res.send("Admin Verified");
            }else{
                res.send("error");
            }
        }
    })
    .catch(err =>{
        console.error("Error getting the document, here is the full error: " + err);
    })
});
app.listen(port);