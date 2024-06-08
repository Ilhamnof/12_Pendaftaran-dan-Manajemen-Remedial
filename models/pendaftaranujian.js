'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PendaftaranUjian extends Model {
    static associate(models) {
      PendaftaranUjian.belongsTo(models.Mahasiswa, { foreignKey: 'id_mahasiswa', onDelete: 'CASCADE' });
      PendaftaranUjian.belongsTo(models.UjianRemedial, { foreignKey: 'id_ujian', onDelete: 'CASCADE' });
      PendaftaranUjian.hasOne(models.RiwayatPendaftaran, { foreignKey: 'id_pendaftaran', onDelete: 'CASCADE' });
    }
  }
  PendaftaranUjian.init({
    id_mahasiswa: DataTypes.INTEGER,
    id_ujian: DataTypes.INTEGER,
    tanggal_pendaftaran: DataTypes.DATE,
    status_verifikasi: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PendaftaranUjian',
  });
  return PendaftaranUjian;
};
