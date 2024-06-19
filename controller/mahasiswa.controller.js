    const { Mahasiswa } = require("../models");
    const { RiwayatPendaftaran, PendaftaranUjian, User, UjianRemedial } = require('../models');

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

    const createPendaftaranUjian = async (req, res) => {
        try {
            const { id_ujian, bukti_pembayaran } = req.body;
    
            // Get user ID from the request (assuming it's stored in req.userId)
    
            // Find the mahasiswa ID based on the user ID
            const mahasiswa = await Mahasiswa.findOne({ where: { userId: req.userId } });
    
            if (!mahasiswa) {
                return res.status(404).json({
                    message: 'Mahasiswa not found'
                });
            }
    
            const id_mahasiswa = mahasiswa.id;
    
            // Save to database
            const newPendaftaran = await PendaftaranUjian.create({
                id_mahasiswa,
                id_ujian,
                bukti_pembayaran,
                tanggal_pendaftaran: new Date(),
                status_verifikasi: false // Initial status is not verified
            });
    
            res.status(201).json({
                message: 'Pendaftaran berhasil disimpan',
                data: newPendaftaran
            });
        } catch (error) {
            console.error('Error creating pendaftaran:', error);
            res.status(500).json({
                message: 'Terjadi kesalahan saat menyimpan pendaftaran',
                error
            });
        }
    };

    const getAllRiwayat = async (req, res, next) => {
        try {
            const userId = req.userId;
            console.log('UserID:', userId); // Debugging
            const riwayat = await RiwayatPendaftaran.findAll({
                include: [
                    {
                        model: PendaftaranUjian,
                        as: 'pendaftaran',
                        required : true,
                        include: [
                            {
                                model: Mahasiswa,
                                as: 'mahasiswa',
                                where: { userId: userId } // Filter based on userId
                            },
                            {
                                model: UjianRemedial,
                                as: 'ujian',
                                required : true,
                            }
                        ]
                    }
                ]
            });
            console.log('Riwayat:', riwayat); // Debugging
            res.locals.riwayat = riwayat;
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

    const notif = async (req,res)=>{ 
        const user = await User.findByPk(req.userId);
        res.render('Mahasiswa/notif', {user, page: "Notif"}); 
    }

    module.exports = {
        getMahasiswaData,
        getAllDataMahasiswa,
        getAllRiwayat,
        deleteMahasiswa,
        notif,
        createPendaftaranUjian,
    };
