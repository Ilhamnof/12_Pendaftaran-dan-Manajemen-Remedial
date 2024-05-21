const { Mahasiswa } = require("../models");

const getMahasiswaData = async (req, res, next) => {
    try {
        // Mendapatkan informasi mahasiswa berdasarkan userID dari token
        const mahasiswa = await Mahasiswa.findOne({ where: { userId: req.userId } });
        if (mahasiswa) {
            res.locals.mahasiswa = mahasiswa; // Simpan data mahasiswa di res.locals
        } else {
            res.locals.mahasiswa = null; // Atur null jika tidak ditemukan
        }
        next(); // Lanjutkan ke middleware berikutnya atau route handler
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getMahasiswaData,
};
