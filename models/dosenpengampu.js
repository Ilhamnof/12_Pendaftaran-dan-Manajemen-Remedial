'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DosenPengampu extends Model {
    static associate(models) {
      DosenPengampu.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  DosenPengampu.init({
    nip: DataTypes.STRING,
    nama: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DosenPengampu',
  });
  return DosenPengampu;
};
