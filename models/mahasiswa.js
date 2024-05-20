'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mahasiswa.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  Mahasiswa.init({
    foto_profil: DataTypes.STRING,
    nim: DataTypes.STRING,
    nama: DataTypes.STRING,
    no_telpon: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mahasiswa',
  });
  return Mahasiswa;
};