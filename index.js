const exp = require('constants');
const express = require('express');
const server = express();
const path = require('path')

server.set('view engine', 'ejs');
server.set('views',path.join(__dirname,'/views/Mahasiswa'));
server.use(express.static(path.join(__dirname,'/assets')));

server.get('/',function (request,respond){
    respond.render('home')
});
server.get('/admin',function (request,respond){
    respond.render('dashboard')
});

server.listen(3000, function(){
console.log('yeayy server sudah jalan di port 3000');
});
