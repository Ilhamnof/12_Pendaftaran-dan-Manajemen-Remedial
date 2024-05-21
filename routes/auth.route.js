const express = require("express");
const router = express.Router();
const controller = require("../controller/auth.controller");
const verifyTokenAndRoles = require("../middleware/verifyTokenAndRole");
const beforeLogin = require("../middleware/beforeLogin");


router.get("/login", beforeLogin, controller.form);
router.post("/process-login", beforeLogin, controller.cekLogin);
router.post("/logout", controller.logout);
router.post("/ubahPassword", verifyTokenAndRoles(['mahasiswa', 'admin']), async (req, res) => {
    try {
        await controller.ubahPassword(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
});

module.exports = router;
