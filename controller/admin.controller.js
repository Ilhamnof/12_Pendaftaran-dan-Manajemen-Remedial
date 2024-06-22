const {UjianRemedial,PendaftaranUjian,Mahasiswa} = require('../models');

const inputMatkul = async (req, res) => {
    try {
    const { nama_matkul, jadwal, deskripsi, materi_ujian } = req.body;
    const ujianRemedial = await UjianRemedial.create({
        nama_matkul,
        jadwal,
        deskripsi,
        materi_ujian,
    });
    res.status(200).json({ message: 'Data berhasil disimpan', data: ujianRemedial });
    } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error });
    }
};

const getAllPendaftaran = async (req, res, next) => {
    try {
        const userId = req.userId;
        console.log('UserID:', userId); // Debugging
        const pendaftaran = await PendaftaranUjian.findAll({
            include: [
                {
                    model: Mahasiswa,
                    as: 'mahasiswa',
                    required : true,
                },
                {
                    model: UjianRemedial,
                    as: 'ujian',
                    required : true,
                }
            ]    
        });
        console.log('Riwayat:', pendaftaran); // Debugging
        res.locals.pendaftaran = pendaftaran;
        next();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
const getAllMatkul = async (req, res, next) => {
    try {
        const userId = req.userId;
        console.log('UserID:', userId); // Debugging
        const ujian = await UjianRemedial.findAll();
        console.log('Riwayat:', ujian); // Debugging
        res.locals.ujian = ujian;
        next();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deletePendaftaran = async (req, res) => {
    try {
        const { id } = req.body;
        await PendaftaranUjian.destroy({ where: { id } });
        res.redirect('/admin/dashboard'); // Mengarahkan kembali ke halaman yang sesuai setelah penghapusan
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllStatusPendaftaran = async (req, res, next) => {
    try {
      const pendaftaranujians = await PendaftaranUjian.findAll({
        include: [
          { model: Mahasiswa, as: "mahasiswa" },
          { model: UjianRemedial, as: "ujian" }
        ],
      });

      console.log(pendaftaranujians)
      res.locals.pendaftaranujians = pendaftaranujians;
      next();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  const approvePendaftaran = async (req, res, next) => {
    try {
      const id = req.body.id;
      // console.log("dduuuarrr :", id)
      await PendaftaranUjian.update(
        { status_verifikasi: true },
        { where: { id: id } }
      );
      res.redirect("/admin/status-pendaftaran");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  const rejectPendaftaran = async (req, res, next) => {
    try {
      const id = req.body.id;
      await PendaftaranUjian.update(
        { status_verifikasi: false },
        { where: { id: id } }
      );
      res.redirect("/admin/status-pendaftaran");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

module.exports = {
    inputMatkul,
    getAllPendaftaran,
    deletePendaftaran,
    getAllMatkul,
    getAllStatusPendaftaran,
    approvePendaftaran,
    rejectPendaftaran,
};