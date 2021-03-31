'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Address.init({
    calle: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    localidad: DataTypes.STRING,
    provincia: DataTypes.STRING,
    cp: DataTypes.INTEGER,
    cpa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};