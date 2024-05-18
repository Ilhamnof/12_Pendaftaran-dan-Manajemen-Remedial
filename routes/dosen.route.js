const express = require("express");
const router = express.Router();
// const controller = require('../controller/auth.controller');
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');

router.get("/dashboard", verifyTokenAndRole('dosen'), (req, res) => {
    res.render("dashboard");
});

module.exports = router;
