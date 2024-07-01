const {
  Mahasiswa,
  PendaftaranUjian,
  User,
  Nilai,
  UjianRemedial,
  RiwayatPendaftaran,
} = require("../models");



const getMahasiswaData = async (req, res, next) => {
  try {
    const mahasiswa = await Mahasiswa.findOne({
      where: { userId: req.userId },
    });
    res.locals.mahasiswa = mahasiswa || null;
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};


const getAllDataMahasiswa = async (req, res, next) => {
  try {
    const mahasiswas = await Mahasiswa.findAll();
    res.locals.mahasiswas = mahasiswas;
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};





const getAllRiwayat = async (req, res, next) => {
  try {
    const userId = req.userId;
    const pendaftaran = await PendaftaranUjian.findAll({
      // where: {
      // status_verifikasi: 'selesai',
      // },
      include: [
          {
              model: Mahasiswa,
              as: 'mahasiswa',
              required : true,
              where: { userId: userId }
          },
          {
              model: UjianRemedial,
              as: 'ujian',
              required : true,
          }
      ]    
  });
    res.locals.pendaftaran = pendaftaran;
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};


const deleteMahasiswa = async (req, res) => {
  try {
    const { id } = req.body;
    await Mahasiswa.destroy({ where: { id } });
    res.redirect("/admin/users"); 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};


const notif = async (req, res) => {
  const user = await User.findByPk(req.userId);
  res.render("Mahasiswa/notif", { user, page: "Notif" });
};

const tambahNilaiMahasiswa = async (req, res) => {
  try {
    const { mahasiswaNilai } = req.body;

    if (!mahasiswaNilai || !Array.isArray(mahasiswaNilai)) {
      return res.status(400).json({ message: "Data nilai mahasiswa tidak valid" });
    }

    const promises = mahasiswaNilai.map(async (item) => {
      const { mahasiswaId, nilai } = item;

      if (!mahasiswaId || !nilai) {
        throw new Error(`Mahasiswa ID dan nilai wajib diisi untuk ID ${mahasiswaId}`);
      }

      const pendaftaran = await PendaftaranUjian.findOne({
        where: { id: mahasiswaId }
      });

      if (!pendaftaran) {
        throw new Error(`Pendaftaran mahasiswa tidak ditemukan untuk ID ${mahasiswaId}`);
      }

      pendaftaran.nilai = nilai;
      return pendaftaran.save();
    });

    await Promise.all(promises);

    res.status(200).json({ message: "Nilai berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating nilai:", error);
    res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};



const getAllNilai = async (req, res, next) => {
  try {
    const userId = req.userId;
    const nilais = await Nilai.findAll({
      include: [
        {
          model: Mahasiswa,
          attributes: ['nama', 'nim'], 
        }
      ],
    });
    res.locals.nilais = nilais;
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateVerifikasi = async (req, res) => {
  try {
    await PendaftaranUjian.update(
      { status_verifikasi: true },
      { where: { status_verifikasi: false } }
    );
    res.status(200).json({ message: 'Status verifikasi berhasil diperbarui' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};


module.exports = {
  getMahasiswaData,
  getAllDataMahasiswa,
  getAllRiwayat,
  deleteMahasiswa,
  notif,
  createPendaftaranUjian,
  upload,
  tambahNilaiMahasiswa,
  getAllNilai,
  updateVerifikasi,  
};
