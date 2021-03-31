'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('users', [{
        name: 'Test',
        email: 'test@fravegino.com',
        pass : bcrypt.hashSync('123123',12),
        createdAt : new Date,
        updatedAt : new Date
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('users', null, {});
     
  }
};
