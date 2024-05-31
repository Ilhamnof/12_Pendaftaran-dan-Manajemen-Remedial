const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
const { getMahasiswaData,getAllDataMahsiswa } = require("../controller/mahasiswa.controller");

// const controller = require('../controller/auth.controller');

router.get('/dashboard',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('dashboard');
});
router.get('/users',verifyTokenAndRole('admin'),getAllDataMahsiswa, (req,res)=>{
    res.render('users');
});
router.get('/tambah-matkul',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('tambah-matkul');
});
router.get('/status-pendaftaran',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('status-pendaftaran');
});
router.get('/pertanyaan',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('pertanyaan');
});
router.get('/nilai-remedial',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('nilai-remedial');
});
router.get('/calendar',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('calendar');
});
router.get('/ubah',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('ubahPw');
});

module.exports = router;