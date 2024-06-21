'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nilai extends Model {
    static associate(models) {
      Nilai.belongsTo(models.Mahasiswa, { foreignKey: 'id_mahasiswa',as:'mahasiswa', onDelete: 'CASCADE' });
      Nilai.belongsTo(models.UjianRemedial, { foreignKey: 'id_ujian',as:'ujian', onDelete: 'CASCADE' });
    }
  }
  Nilai.init({
    id_mahasiswa: DataTypes.INTEGER,
    id_ujian: DataTypes.INTEGER,
    nilai: DataTypes.FLOAT,
    status_verifikasi: DataTypes.BOOLEAN,
    tanggal_input: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Nilai',
  });
  return Nilai;
};
