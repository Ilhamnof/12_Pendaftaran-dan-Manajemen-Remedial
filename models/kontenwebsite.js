'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KontenWebsite extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  KontenWebsite.init({
    judul: DataTypes.STRING,
    isi: DataTypes.TEXT,
    tanggal_dibuat: DataTypes.DATE,
    tipe_konten: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KontenWebsite',
  });
  return KontenWebsite;
};
