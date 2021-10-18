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
class Article{
    constructor(month, day, year, time, header, body){
        this.month = month;
        this.day = day;
        this.year = year;
        this.time = time;
        this.header = header;
        this.body = body;
    }
    toString(){
        return this.month + "," + this.day + "," + this.year + "," + this.header + "," + this.year;
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
let articleConverter = {
    toFirestore: function(article){
        return{
            Month: article.month,
            Day: article.day,
            Year: article.year,
            Time: article.time,
            Header: article.header,
            Body: article.body
        };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Article(data.month, data.day, data.year, data.time, data.header, data.body);
    }
}
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
app.get('/getArticles/:month/:year', function(req, res){
    
});
app.get('/uploadArticle/:month/:day/:year/:time/:header/:body', function(req, res){
    let article = new Article();
    article.month = req.params.month;
    article.day = req.params.day;
    article.year = req.params.year;
    article.time = req.params.time;
    article.header = req.params.header;
    article.body = req.params.body;
    
    db.collection("Articles").doc(article.month + "/" + article.day + "/" + article.year + ":" + article.time).withConverter(articleConverter).set(article).then(() => {
        console.log("Article logged in database");
    })
});
app.get('/checkFirstArticleDate', function(req, res){
    
});
app.listen(port);