
const {User}  = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const form = (req,res)=>{
return res.render('login');
}



const cekLogin = async(req,res)=>{

const { email, password } = req.body;
try {
// Menggunakan nama variabel lain untuk menyimpan hasil pencarian user
const user = await User.findOne({ where: { email } });

if (!user) {
    return res.status(404).json({ message: "User not found" });
}

// Verifikasi password
const isValidPassword = await bcrypt.compare(password, user.password);

if (!isValidPassword) {
    return res.redirect("/auth/login");
}

// Buat token JWT
const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    'secretsecret',
    { expiresIn: 86400 }
);

// Set cookie dengan token
res.cookie("token", token, { httpOnly: true });

// Redirect ke halaman sesuai dengan peran pengguna
if (user.role == "mahasiswa"){
    return res.redirect("/");
} else if (user.role == "dosen"){
    return res.redirect("/dosen/dashboard");
} else if(user.role == "admin"){
    return res.redirect("/admin/dashboard");
}

// Jika tidak ada peran yang cocok, berikan respons standar
res.status(200).send({ auth: true, token: token });

} catch (err) {
console.error("Error during login: ", err);
res.status(500).json({ message: "Internal server error" });
}

}

function logout(req, res) {
res.clearCookie("token");
res.redirect("/auth/login");

}

module.exports = {
form,
cekLogin,
logout,

};