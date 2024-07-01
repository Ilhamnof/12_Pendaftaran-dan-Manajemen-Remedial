'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE role = "mahasiswa";'
    );

    // Array contoh nama mahasiswa
    const names = [
      'Ilham Nofaldi', 'Tugalan Tester', 'Yuki Kato', 'Irsan Syahputra', 
      'Fajar Kurniawan', 'Dewi Lestari', 'Andi Permana', 'Nina Haryanti', 
      'Yusuf Pratama', 'Mira Handayani'
    ];

    const alamat = [
      'Jl. Kandang Padati No.126 C', 'Jl. Thamrin No. 33',
      'Jl. Gatot Subroto Kav. 7-9', 'Jl. HR Rasuna Said Blok X-5',
      'Jl. Jend. Sudirman Kav. 52-53', 'Jl. MH Thamrin No. 1',
      'Jl. Jend. Gatot Subroto Kav. 59A', 'Jl. Prof. Dr. Satrio Kav. 3-5',
      'Jl. Asia Afrika No. 8', 'Jl. Merdeka Barat No. 12'
    ];

    const mahasiswaData = users[0].map((user, index) => ({
      foto_profil: null, 
      nim: `22115220${28 + index}`, 
      nama: names[index % names.length], 
      prodi: 'Sistem Informasi', 
      semester: 4, 
      no_telpon: `0821230941${42 + index}`,
      alamat: alamat[index % alamat.length],
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
