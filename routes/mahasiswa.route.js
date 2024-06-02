const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
const { getMahasiswaData } = require("../controller/mahasiswa.controller");

// Home page
router.get('/', verifyTokenAndRole('mahasiswa'), getMahasiswaData, (req, res) => {
    const mahasiswa = res.locals.mahasiswa;
    res.render('home', { title: 'Home', mahasiswa }); // Menambahkan title
});

// Ubah password page
router.get('/ubah', verifyTokenAndRole('mahasiswa'), (req, res) => {
    res.render('ubahPw', { title: 'Ubah Password' }); // Menambahkan title
});

router.get('/formulir', verifyTokenAndRole('mahasiswa'),getMahasiswaData, (req, res) => {
    res.render('formulir', { title: 'Formulir' }); // Menambahkan title
});
router.get('/faq', verifyTokenAndRole('mahasiswa'),getMahasiswaData, (req, res) => {
    res.render('faq', { title: 'FaQ' }); // Menambahkan title
});
// Profil page
router.get('/profil', verifyTokenAndRole('mahasiswa'), getMahasiswaData, (req, res) => {
    res.render('profil', { title: 'Profil'}); // Menambahkan title
});

module.exports = router;
