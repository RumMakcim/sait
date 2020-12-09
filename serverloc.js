var app = require('express')();
var express = require('express');
var http = require('http').Server(app);

const cookieParser = require("cookie-parser")
app.use(cookieParser('secret key'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./'));
app.get('/', function (req, res) {
  res.sendfile('index.html');
});

http.listen(4000, '127.0.0.1');



app.get('/set-cookie', (req, res) => {

  res.cookie('token', '12345ABCDE');
  console.log(res.cookie('token'));
});