'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.Cart,{
        as : 'carrito',
        foreignKey : 'orderId',
        onDelete : 'cascade'
      })
      Order.belongsTo(models.User,{
        as : 'cliente',
        foreignKey : 'userId'
      })
    }
  };
  Order.init({
    status: DataTypes.STRING,
    userId :DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};