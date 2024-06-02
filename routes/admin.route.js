const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
const { getAllDataMahasiswa,deleteMahasiswa } = require("../controller/mahasiswa.controller");

// const controller = require('../controller/auth.controller');

router.get('/dashboard',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('dashboard',{ title: 'Dashboard' });
});
router.get('/users',verifyTokenAndRole('admin'),getAllDataMahasiswa, (req,res)=>{
    res.render('users',{ title: 'Users' });
});
router.get('/tambah-matkul',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('tambah-matkul',{ title: 'Tambah Matkul' });
});
router.get('/status-pendaftaran',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('status-pendaftaran',{ title: 'Status Pendaftaran' });
});
router.get('/pertanyaan',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('pertanyaan',{ title: 'Pertanyaan' });
});
router.get('/nilai-remedial',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('nilai-remedial',{ title: 'Nilai Remedial' });
});
router.get('/calendar',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('calendar',{ title: 'Calendar' });
});
router.get('/ubah',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('ubahPw');
});

router.post('/delete', verifyTokenAndRole('admin'), deleteMahasiswa);

module.exports = router;