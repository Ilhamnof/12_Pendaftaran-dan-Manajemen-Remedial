const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

// const controller = require('../controller/auth.controller');

router.get('/dashboard',verifyToken, checkRole('admin'), (req,res)=>{
    res.render('dashboard');
});





module.exports = router;