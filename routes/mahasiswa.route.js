const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
const { getMahasiswaData, getAllRiwayat, createPendaftaranUjian } = require("../controller/mahasiswa.controller");
const {getAllMatkul} = require ("../controller/admin.controller")

// Home page
router.get('/', verifyTokenAndRole('mahasiswa'), getMahasiswaData, (req, res) => {
    const mahasiswa = res.locals.mahasiswa;
    res.render('home', { title: 'Home', mahasiswa }); // Menambahkan title
});

// Ubah password page
router.get('/ubah', verifyTokenAndRole('mahasiswa'), (req, res) => {
    res.render('ubahPw', { title: 'Ubah Password' }); // Menambahkan title
});

router.get('/formulir', verifyTokenAndRole('mahasiswa'),getMahasiswaData,getAllMatkul,(req, res) => {
    res.render('formulir', { title: 'Formulir' }); // Menambahkan title
});
router.post('/pendaftaran', verifyTokenAndRole('mahasiswa'), createPendaftaranUjian);

router.get('/faq', verifyTokenAndRole('mahasiswa'),getMahasiswaData, (req, res) => {
    res.render('faq', { title: 'FaQ' }); // Menambahkan title
});
// Profil page
router.get('/profil', verifyTokenAndRole('mahasiswa'), getMahasiswaData, (req, res) => {
    res.render('profil', { title: 'Profil'}); // Menambahkan title
});
router.get('/riwayat', verifyTokenAndRole('mahasiswa'),getMahasiswaData,getAllRiwayat, (req, res) => {
    res.render('riwayat', { title: 'riwayat'}); // Menambahkan title
});
router.get('/notifikasi',verifyTokenAndRole('mahasiswa'), (req,res)=>{
    res.render('notif',{ title: 'Notifikasi' });
});

module.exports = router;
