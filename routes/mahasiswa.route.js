const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');
// const controller = require('../controller/auth.controller');


router.get('/',verifyToken, checkRole('mahasiswa'), (req,res)=>{
    res.render('home');
});









module.exports = router;