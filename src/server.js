const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/home.html');
});
app.get('home.html', function(req,res){
    res.sendFile(__dirname + "/public/home.html")
});
app.get('archive.html', function(req, res){
    res.sendFile(__dirname + "public/archive.html");
});
app.get('about.html', function(req, res){
    res.sendFile(__dirname + "public/about.html");
});
app.listen(port);