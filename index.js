const exp = require('constants');
const express = require('express');
const server = express();
const path = require('path')

server.set('view engine', 'ejs');
server.set('views', [
    path.join(__dirname, '/views/Mahasiswa'),
    path.join(__dirname, '/views/Dashboard'),
]);
server.use(express.static(path.join(__dirname,'/assets')));
server.use(express.static(path.join(__dirname,'/node_modules/preline/dist')));

server.get('/',function (request,respond){
    respond.render('home')
});
server.get('/admin',function (request,respond){
    respond.render('dashboard')
});
server.get('/auth',function (request,respond){
    respond.render('login')
});

server.listen(3000, function(){
console.log('listening on http://localhost:' + this.address().port);
});
