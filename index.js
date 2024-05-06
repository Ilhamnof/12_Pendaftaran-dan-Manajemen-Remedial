const exp = require('constants');
const express = require('express');
const server = express();
const path = require('path')

server.set('view engine', 'ejs');
server.set('views',path.join(__dirname,'/views'));
server.use(express.static(path.join(__dirname,'/assets')));

server.get('/',function (request,respond){
    respond.render('home')
});

server.listen(3000, function(){
console.log('yeayy server sudah jalan di port 3000');
});



exp