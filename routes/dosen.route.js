const express = require("express");
const router = express.Router();
// const controller = require('../controller/auth.controller');
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
const { getAllPendaftaran } = require("../controller/admin.controller");

router.get("/dashboard", verifyTokenAndRole('dosen'),getAllPendaftaran, (req, res) => {
    res.render("dashboardDsn",{ title: 'Nilai' });
});

module.exports = router;
