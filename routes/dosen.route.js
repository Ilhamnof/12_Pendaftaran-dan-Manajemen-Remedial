const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
const { getAllPendaftaran ,getAllMatkul, getAllStatusPendaftaran} = require("../controller/admin.controller");
const { updateNilai, generate } = require("../controller/dosen.controller");
const { getAllDataMahasiswa, tambahNilaiMahasiswa, getAllNilai, updateVerifikasi  } = require("../controller/mahasiswa.controller");

router.get("/dashboard", verifyTokenAndRole('dosen'),getAllPendaftaran, (req, res) => {
    res.render("dashboardDsn",{ title: 'Dashboard' });
});

router.post("/generate", verifyTokenAndRole('dosen'),generate)

router.get('/daftar-mahasiswa',verifyTokenAndRole('dosen'), getAllDataMahasiswa,(req,res)=>{
    res.render('daftarMhs',{ title: 'Daftar Mahasiswa' });
});

router.get('/jadwal-remedial',verifyTokenAndRole('dosen'), (req,res)=>{
    res.render('jadwal-remed',{ title: 'Jadwal Remedial' });
});

router.get('/nilai-remedial',verifyTokenAndRole('dosen'),getAllStatusPendaftaran, (req,res)=>{
    res.render('nilai-remedials',{ title: 'Nilai Remedial' });
});

router.post('/tambah-nilai-mahasiswa', tambahNilaiMahasiswa);

router.get('/rekap', verifyTokenAndRole('dosen'), getAllStatusPendaftaran, (req, res) => {
    res.render('rekap', { title: 'Rekap Nilai' });
});

router.get('/verifikasi', verifyTokenAndRole('dosen'), getAllStatusPendaftaran, (req, res) => {
    res.render('verification', { title: 'Verifikasi Nilai' });
});

router.post('/tambah-nilai-mahasiswa', tambahNilaiMahasiswa, (req, res) => {
    res.redirect('/dosen/nilai-remedial');
});

router.post('/update-verifikasi',updateVerifikasi, (req, res) => {
    res.render('verification', { title: 'Verifikasi Nilai' });
});


module.exports = router;
 