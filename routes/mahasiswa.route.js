const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');


router.get('/',verifyTokenAndRole('mahasiswa'), (req,res)=>{
    res.render('home');
});
router.get('/ubah',verifyTokenAndRole('mahasiswa'), (req,res)=>{
    res.render('ubahPw');
});

module.exports = router;