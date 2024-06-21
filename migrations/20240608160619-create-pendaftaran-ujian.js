'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PendaftaranUjians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_mahasiswa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Mahasiswas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_ujian: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UjianRemedials',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tanggal_pendaftaran: {
        type: Sequelize.DATE
      },
      nilai_sebelumnya: {
        type: Sequelize.STRING
      },
      alasan: {
        type: Sequelize.STRING
      },
      bukti_pembayaran: {
        type: Sequelize.STRING
      },
      status_verifikasi: {
        type: Sequelize.ENUM('diproses', 'diverifikasi', 'selesai', 'ditolak'),
        defaultValue: 'diproses',
        allowNull: false
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
    await queryInterface.dropTable('PendaftaranUjians');
  }
};
