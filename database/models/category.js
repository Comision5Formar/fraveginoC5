'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product,{
        as : 'productos',
        foreignKey: 'categoryId'
      })
      Category.belongsTo(models.Section,{
        as : 'seccion',
        foreignKey : 'sectionId'
      })
    }
  };
  Category.init({
    nombre: DataTypes.STRING,
    sectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};