'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PendaftaranUjian extends Model {
    static associate(models) {
      PendaftaranUjian.belongsTo(models.Mahasiswa, { foreignKey: 'id_mahasiswa', as: 'mahasiswa', onDelete: 'CASCADE' });
      PendaftaranUjian.belongsTo(models.UjianRemedial, { foreignKey: 'id_ujian', as: 'ujian', onDelete: 'CASCADE' });
      PendaftaranUjian.hasOne(models.RiwayatPendaftaran, { foreignKey: 'id_pendaftaran', as: 'riwayat', onDelete: 'CASCADE' });
    }
  }
  
  PendaftaranUjian.init({
    id_mahasiswa: DataTypes.INTEGER,
    id_ujian: DataTypes.INTEGER,
    tanggal_pendaftaran: DataTypes.DATE,
    nilai_sebelumnya: DataTypes.INTEGER,
    nilai: DataTypes.INTEGER,
    alasan: DataTypes.STRING,
    bukti_pembayaran: DataTypes.STRING,
    status_verifikasi: {
      type: DataTypes.ENUM('diproses', 'diverifikasi', 'selesai', 'ditolak'),
      defaultValue: 'diproses'
    }
  }, {
    sequelize,
    modelName: 'PendaftaranUjian',
  });

  return PendaftaranUjian;
};
