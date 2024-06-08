'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Nilais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_mahasiswa: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Mahasiswas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_ujian: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UjianRemedials',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nilai: {
        type: Sequelize.FLOAT
      },
      status_verifikasi: {
        type: Sequelize.BOOLEAN
      },
      tanggal_input: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Nilais');
  }
};
