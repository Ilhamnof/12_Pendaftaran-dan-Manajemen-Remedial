const {
  Mahasiswa,
  PendaftaranUjian,
  User,
  Nilai,
  UjianRemedial,
  RiwayatPendaftaran,
} = require("../models");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/uploads/'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type, only JPEG, PNG, and PDF is allowed!"),
      false
    );
  }
};


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, 
  },
  fileFilter: fileFilter,
});


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


const createPendaftaranUjian = async (req, res) => {
    try {
        const { id_ujian, nilai_sebelumnya, alasan } = req.body;
        const bukti_pembayaran = req.file ? `/uploads/${req.file.filename}` : null;

        
        const mahasiswa = await Mahasiswa.findOne({ where: { userId: req.userId } });
        
        if (!bukti_pembayaran) {
            return res.status(400).json({
                message: 'File bukti pembayaran tidak ditemukan'
            });
        }   

        const id_mahasiswa = mahasiswa.id;

        const newPendaftaran = await PendaftaranUjian.create({
            id_mahasiswa,
            id_ujian,
            tanggal_pendaftaran: new Date(),
            bukti_pembayaran,
            nilai_sebelumnya,
            alasan,
            status_verifikasi: "diproses"
        });

    res.status(200).json({
      message: "Pendaftaran berhasil disimpan",
      data: newPendaftaran,
    });
  } catch (error) {
    console.error("Error creating pendaftaran:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat menyimpan pendaftaran",
      error,
    });
  }
};


const getAllRiwayat = async (req, res, next) => {
  try {
    const userId = req.userId;
    const riwayat = await RiwayatPendaftaran.findAll({
      include: [
        {
          model: PendaftaranUjian,
          as: "pendaftaran",
          required: true,
          include: [
            { model: Mahasiswa, as: "mahasiswa", where: { userId: userId } },
            { model: UjianRemedial, as: "ujian", required: true },
          ],
        },
      ],
    });
    res.locals.riwayat = riwayat;
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
