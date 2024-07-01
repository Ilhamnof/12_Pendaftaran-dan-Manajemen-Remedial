'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UjianRemedials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_matkul: {
        type: Sequelize.STRING
      },
      dosen_pengampu: {
        type: Sequelize.STRING
      },
      jadwal: {
        type: Sequelize.DATE
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      materi_ujian: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UjianRemedials');
  }
};
