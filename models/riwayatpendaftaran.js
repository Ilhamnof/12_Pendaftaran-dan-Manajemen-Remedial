'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RiwayatPendaftaran extends Model {
    static associate(models) {
      RiwayatPendaftaran.belongsTo(models.PendaftaranUjian, { foreignKey: 'id_pendaftaran',as: 'pendaftaran', onDelete: 'CASCADE' });
    }
  }
  RiwayatPendaftaran.init({
    id_pendaftaran: DataTypes.INTEGER,
    status_verifikasi: DataTypes.BOOLEAN,
    tanggal_dihapus: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RiwayatPendaftaran',
  });
  return RiwayatPendaftaran;
};
