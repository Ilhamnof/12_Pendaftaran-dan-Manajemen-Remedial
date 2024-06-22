'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      prodi: {
        type: Sequelize.STRING
      },
      semester: {
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
        unique: true,
        references: {
          model: 'Users',
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Mahasiswas');
  }
};
