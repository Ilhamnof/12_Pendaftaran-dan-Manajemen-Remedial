const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const form = (req, res) => {
    return res.render("login");
};

const cekLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Menggunakan nama variabel lain untuk menyimpan hasil pencarian user
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.redirect("/auth/login");
        }

        // Verifikasi password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.redirect("/auth/login");
        }

        // Buat token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            "secretsecret",
            { expiresIn: 86400 }
        );

        // Set cookie dengan token
        res.cookie("token", token, { httpOnly: true });

        // Redirect ke halaman sesuai dengan peran pengguna
        if (user.role == "mahasiswa") {
            return res.redirect("/");
        } else if (user.role == "dosen") {
            return res.redirect("/dosen/dashboard");
        } else if (user.role == "admin") {
            return res.redirect("/admin/dashboard");
        }

        // Jika tidak ada peran yang cocok, berikan respons standar
        res.status(200).send({ auth: true, token: token });
    } catch (err) {
        console.error("Error during login: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

function logout(req, res) {
    res.clearCookie("token");
    res.redirect("/auth/login");
}

const ubahPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        // Log data yang diterima dari form
        console.log("Request body:", req.body);

        // Cari pengguna berdasarkan userId
        const user = await User.findByPk(req.userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }

        // Periksa apakah password saat ini cocok
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password saat ini salah" });
        }

        // Enkripsi password baru
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Perbarui password pengguna di database
        await user.update({ password: hashedNewPassword });

        return res.status(200).json({ message: "Password berhasil diubah" });
    } catch (error) {
        console.log("Error during password change:", error);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};






module.exports = {
    form,
    cekLogin,
    logout,
    ubahPassword
};

