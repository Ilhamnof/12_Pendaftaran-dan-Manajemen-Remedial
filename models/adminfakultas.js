'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminFakultas extends Model {
    static associate(models) {
      AdminFakultas.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  AdminFakultas.init({
    nip: DataTypes.STRING,
    nama: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AdminFakultas',
  });
  return AdminFakultas;
};
