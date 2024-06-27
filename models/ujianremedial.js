'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UjianRemedial extends Model {
    static associate(models) {
      UjianRemedial.hasMany(models.PendaftaranUjian, { foreignKey: 'id_ujian',as: 'ujian' });
    }
  }
  UjianRemedial.init({
    nama_matkul: DataTypes.STRING,
    dosen_pengampu: DataTypes.STRING,
    jadwal: DataTypes.DATE,
    deskripsi: DataTypes.TEXT,
    materi_ujian: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UjianRemedial',
  });
  return UjianRemedial;
};
