const {
  Mahasiswa,
  PendaftaranUjian,
  User,
  Nilai,
  UjianRemedial,
  RiwayatPendaftaran,
} = require("../models");
const multer = require("multer");

// Konfigurasi penyimpanan dan penamaan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/uploads/'); // Folder tujuan
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Filter file untuk tipe tertentu
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

// Konfigurasi multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Ukuran file maksimum 5MB
  },
  fileFilter: fileFilter,
});

// Middleware untuk mendapatkan data mahasiswa
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

// Middleware untuk mendapatkan semua data mahasiswa
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

// Fungsi untuk membuat pendaftaran ujian
const createPendaftaranUjian = async (req, res) => {
    try {
        const { id_ujian, nilai_sebelumnya, alasan } = req.body;
        const bukti_pembayaran = req.file ? `/uploads/${req.file.filename}` : null;

        // Get user ID from the request (assuming it's stored in req.userId)
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

// Middleware untuk mendapatkan riwayat pendaftaran
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

// Fungsi untuk menghapus mahasiswa
const deleteMahasiswa = async (req, res) => {
  try {
    const { id } = req.body;
    await Mahasiswa.destroy({ where: { id } });
    res.redirect("/admin/users"); // Redirect setelah penghapusan
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fungsi untuk notifikasi
const notif = async (req, res) => {
  const user = await User.findByPk(req.userId);
  res.render("Mahasiswa/notif", { user, page: "Notif" });
};

const tambahNilaiMahasiswa = async (req, res) => {
  try {
    const { mahasiswaId, nilai } = req.body;

    // console.log("duuarr ", req.body);

    if (!mahasiswaId || !nilai) {
      return res.status(400).json({ message: "Mahasiswa ID dan nilai wajib diisi" });
    }

    const pendaftaran = await PendaftaranUjian.findOne({
      where: { id: mahasiswaId }    });

    if (!pendaftaran) {
      return res.status(404).json({ message: "Pendaftaran mahasiswa tidak ditemukan" });
    }

    pendaftaran.nilai = nilai;
    await pendaftaran.save();

    res.status(200).json({ message: "Nilai berhasil diperbarui", data: pendaftaran });
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
          attributes: ['nama', 'nim'], // Tambahkan atribut yang ingin Anda tampilkan
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
