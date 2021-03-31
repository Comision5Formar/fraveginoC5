'use strict';
const faker = require('faker')

const products = [];

for (let i = 0; i < 100; i++) {
  let producto = {
    nombre : faker.commerce.productName(),
    descripcion : faker.commerce.productDescription(),
    precio : faker.random.number({max:1000,min:100}),
    descuento : faker.random.number({max:40,min:10}),
    categoryId : faker.random.number({max:20,min:1}),
    createdAt : new Date,
    updatedAt : new Date
  }
  products.push(producto)
  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('products', products, {});
    
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('products', null, {});
     
  }
};
