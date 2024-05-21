const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
const {User, Mahasiswa} = require('../models');
const controller = require("../controller/mahasiswa.controller");
const { getMahasiswaData } = require("../controller/mahasiswa.controller");



router.get('/', verifyTokenAndRole('mahasiswa'), getMahasiswaData, (req, res) => {
    const mahasiswa = res.locals.mahasiswa;
    res.render('home', { mahasiswa }); // Mengirimkan data mahasiswa ke template EJS
});
router.get('/ubah',verifyTokenAndRole('mahasiswa'), (req,res)=>{
    res.render('ubahPw');
});
router.get('/profil',verifyTokenAndRole('mahasiswa'),getMahasiswaData, (req,res)=>{
    res.render('profil');
});

module.exports = router;