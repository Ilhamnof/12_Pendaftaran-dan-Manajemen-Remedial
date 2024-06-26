const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
const { getAllDataMahasiswa,deleteMahasiswa } = require("../controller/mahasiswa.controller");
const {inputMatkul, getAllPendaftaran, deletePendaftaran, getAllMatkul, getAllStatusPendaftaran, approvePendaftaran, rejectPendaftaran, deleteMatkul, inputKonten, } = require("../controller/admin.controller");
const {PendaftaranUjian} = require('../models');
// const controller = require('../controller/auth.controller');

router.get('/dashboard',verifyTokenAndRole('admin'),getAllMatkul, (req,res)=>{
    res.render('dashboard',{ title: 'Dashboard' });
});
router.get('/users',verifyTokenAndRole('admin'),getAllDataMahasiswa, (req,res)=>{
    res.render('users',{ title: 'Users' });
});
router.get('/tambah-matkul',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('tambah-matkul',{ title: 'Tambah Mata Kuliah' });
});
router.get('/status-pendaftaran',verifyTokenAndRole('admin'),getAllPendaftaran, (req,res)=>{
    res.render('status-pendaftaran',{ title: 'Status Pendaftaran' });
});
router.get('/pertanyaan',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('pertanyaan',{ title: 'Pertanyaan' });
});
router.get('/nilai-remedial',verifyTokenAndRole('admin'),getAllPendaftaran, (req,res)=>{
    res.render('nilai-remedial',{ title: 'Nilai Remedial' });
});
router.get('/calendar',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('calendar',{ title: 'Calendar' });
});
router.get('/konten',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('konten',{ title: 'Konten' });
});
router.post('/kontenpost',verifyTokenAndRole('admin'),inputKonten);

router.get('/ubah',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('ubahPw');
});

router.post('/delete', verifyTokenAndRole('admin'), deleteMahasiswa);
router.post('/deletePendaftaran', verifyTokenAndRole('admin'), deletePendaftaran);
router.post('/deleteMatkul', verifyTokenAndRole('admin'), deleteMatkul);

router.post('/tambah-matkul',inputMatkul, (req,res)=>{
    res.redirect('/admin/tambah-matkul');
});
router.post('/status-pendaftaran/approve',verifyTokenAndRole('admin'), approvePendaftaran);
router.post('/status-pendaftaran/reject',verifyTokenAndRole('admin'), rejectPendaftaran);


router.post('/addNilai', async (req, res) => {
    try {
        const { data } = req.body;
        for (const entry of data) {
            const { nim, nilai } = entry;
            await PendaftaranUjian.update({ nilai: nilai }, { where: { nim: nim } });
        }
        res.status(200).send('Data berhasil disimpan');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/updateStatus', async (req, res) => {
    try {
        const { id, status_verifikasi } = req.body;
        await PendaftaranUjian.update(
            { status_verifikasi },
            { where: { id } }
        );
        res.redirect('/admin/status-pendaftaran'); // Redirect to the admin page after update
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;