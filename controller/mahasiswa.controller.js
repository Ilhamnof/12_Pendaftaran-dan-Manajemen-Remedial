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
    const getAllDataMahasiswa = async (req, res, next) => {
        try {
            const mahasiswas = await Mahasiswa.findAll();
            res.locals.mahasiswas = mahasiswas;
            next();
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    };

    const deleteMahasiswa = async (req, res) => {
        try {
            const { id } = req.body;
            await Mahasiswa.destroy({ where: { id } });
            res.redirect('/admin/users'); // Mengarahkan kembali ke halaman yang sesuai setelah penghapusan
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    };
    module.exports = {
        getMahasiswaData,
        getAllDataMahasiswa,
        deleteMahasiswa,
    };
