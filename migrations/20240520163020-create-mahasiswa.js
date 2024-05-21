// migrations/[timestamp]-add-user-id-to-mahasiswa.js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Mahasiswas', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        foto_profil: {
          type: Sequelize.STRING
        },
        nim: {
          type: Sequelize.STRING
        },
        nama: {
          type: Sequelize.STRING
        },
        no_telpon: {
          type: Sequelize.STRING
        },
        alamat: {
          type: Sequelize.TEXT
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users', // Nama tabel Users
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Mahasiswas');
  }
};
