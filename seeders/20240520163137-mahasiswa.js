'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE role = "mahasiswa";'
    );

    // Array contoh nama mahasiswa
    const names = [
      'Ilham Nofaldi', 'Ahmad Budi', 'Siti Aminah', 'Rina Kartika', 
      'Fajar Kurniawan', 'Dewi Lestari', 'Andi Permana', 'Nina Haryanti', 
      'Yusuf Pratama', 'Mira Handayani'
    ];

    const mahasiswaData = users[0].map((user, index) => ({
      foto_profil: null, 
      nim: `22115220${28 + index}`, 
      nama: names[index % names.length], 
      prodi: 'Sistem Informasi', 
      semester: 4, 
      no_telpon: `0821230941${42 + index}`,
      alamat: `Jl. Kandang Padati No.126 C`,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Mahasiswas', mahasiswaData);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Mahasiswas', null, {});
  }
};
