'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE role = "mahasiswa";'
    );

    const mahasiswaData = users[0].map(user => ({
      foto_profil: null, 
      nim: `2211522028`,  
      nama: `Ilham Nofaldi`,
      no_telpon: `082123094142`, // Contoh nomor telepon acak
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
