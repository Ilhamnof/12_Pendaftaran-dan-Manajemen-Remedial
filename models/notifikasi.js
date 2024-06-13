'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifikasi extends Model {
    static associate(models) {
      Notifikasi.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  Notifikasi.init({
    userId: DataTypes.INTEGER,
    pesan: DataTypes.TEXT,
    tanggal_kirim: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Notifikasi',
  });
  return Notifikasi;
};
