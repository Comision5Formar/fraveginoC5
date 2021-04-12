'use strict';

const faker = require('faker')

let images = [];
for (let i = 0; i < 300; i++) {
  for (let p = 1; p <= 100; p++) {
    let image = {
      link : faker.image.image(),
      productId : p,
      createdAt : new Date,
      updatedAt : new Date
    };
    images.push(image)
    
  }
 
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkInsert('images', images, {});
    
  },

  down: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkDelete('images', null, {});
     
  }
};
