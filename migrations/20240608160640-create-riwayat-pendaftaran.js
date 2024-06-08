'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RiwayatPendaftarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pendaftaran: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PendaftaranUjians',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tanggal_pendaftaran: {
        type: Sequelize.DATE
      },
      status_verifikasi: {
        type: Sequelize.BOOLEAN
      },
      tanggal_dihapus: {
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
    await queryInterface.dropTable('RiwayatPendaftarans');
  }
};
