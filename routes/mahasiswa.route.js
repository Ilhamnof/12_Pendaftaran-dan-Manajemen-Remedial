const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
const {User, Mahasiswa} = require('../models');



router.get('/', verifyTokenAndRole('mahasiswa'), async (req, res) => {
    try {
        // Mendapatkan informasi mahasiswa berdasarkan userID dari token
        const mahasiswa = await Mahasiswa.findOne({ where: { userId: req.userId } });
        if (mahasiswa) {
            res.render('home', { namaMahasiswa: mahasiswa.nama }); // Mengirimkan nama mahasiswa ke template EJS
        } else {
            res.render('home', { namaMahasiswa: 'Nama Mahasiswa Tidak Ditemukan' }); // Jika mahasiswa tidak ditemukan
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/ubah',verifyTokenAndRole('mahasiswa'), (req,res)=>{
    res.render('ubahPw');
});

module.exports = router;