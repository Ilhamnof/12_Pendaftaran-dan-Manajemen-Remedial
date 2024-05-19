const express = require('express');
const router = express.Router();
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');

// const controller = require('../controller/auth.controller');

router.get('/dashboard',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('dashboard');
});
router.get('/ubah',verifyTokenAndRole('admin'), (req,res)=>{
    res.render('ubahPw');
});

module.exports = router;