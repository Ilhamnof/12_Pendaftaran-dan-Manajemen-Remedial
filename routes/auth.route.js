const express = require('express');
const router = express.Router();
const controller = require('../controller/auth.controller');
const verifyToken = require('../middleware/verifyToken');
const beforeLogin = require('../middleware/beforeLogin');  



router.get('/login',beforeLogin, controller.form);
router.post('/process-login',beforeLogin, controller.cekLogin);



router.post('/logout', verifyToken, controller.logout);


module.exports = router;