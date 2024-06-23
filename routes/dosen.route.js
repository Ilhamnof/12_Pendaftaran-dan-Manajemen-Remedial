const express = require("express");
const router = express.Router();
// const controller = require('../controller/auth.controller');
const verifyTokenAndRole = require('../middleware/verifyTokenAndRole');
const { getAllPendaftaran } = require("../controller/admin.controller");
const { updateNilai, generate } = require("../controller/dosen.controller");

router.get("/dashboard", verifyTokenAndRole('dosen'),getAllPendaftaran, (req, res) => {
    res.render("dashboardDsn",{ title: 'Nilai' });
});

router.post("/addNilai", verifyTokenAndRole('dosen'),updateNilai)
router.post("/generate", verifyTokenAndRole('dosen'),generate)


module.exports = router;
