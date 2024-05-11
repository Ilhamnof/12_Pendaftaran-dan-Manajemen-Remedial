const express = require('express');
const router = express.Router();
// const controller = require('../controller/auth.controller');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

router.get('/dashboard',verifyToken, checkRole('dosen'), (req,res)=>{
    res.render('dashboard');
});



module.exports = router;