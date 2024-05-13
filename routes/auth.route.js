const express = require("express");
const router = express.Router();
const controller = require("../controller/auth.controller");
const verifyToken = require("../middleware/verifyToken");
const beforeLogin = require("../middleware/beforeLogin");

router.get("/login", beforeLogin, controller.form);
router.get("/forgot-password", beforeLogin, controller.forgotPasswordForm);
router.post("/confirm-email", beforeLogin, controller.confirmEmail);
router.post("/process-login", beforeLogin, controller.cekLogin);
router.get("/reset-password/:token", beforeLogin, controller.formResetPassword);
router.post("/reset-password", beforeLogin, controller.resetPassword);
router.post("/logout", verifyToken, controller.logout);

module.exports = router;
