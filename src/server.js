const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/home.html');
});
app.get('/Home.html', function(req,res){
    res.sendFile(__dirname + "/public/home.html")
});
app.get('/Archive.html', function(req, res){
    res.sendFile(__dirname + "public/archive.html");
});
app.get('/About.html', function(req, res){
    res.sendFile(__dirname + "public/about.html");
});
app.get('/Login.html', function(req, res){
    res.sendFile(__dirname + "public/login.html");
});
app.listen(port);