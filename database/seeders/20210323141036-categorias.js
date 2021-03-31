'use strict';

const categoria1 = ['Televisores','Audio','Video','Proyectores'];
const categoria2 = ['Celulares','Informática','Consolas'];
const categoria3 = ['Cocina','Lavado', 'Climatización','Electrodomésticos'];
const categoria4 = ['Muebles','Colchones','Iluminación','Jardín','Herramientas'];
const categoria5 = ['Personal','Salud','Fitness','Bicicletas'];
const categories = [];

for (let i = 0; i < categoria1.length; i++) {
  let subcategoria = {
    nombre : categoria1[i],
    sectionId : 1,
    createdAt : new Date,
    updatedAt : new Date
  } 
  categories.push(subcategoria)
};

for (let i = 0; i < categoria2.length; i++) {
  let subcategoria = {
    nombre : categoria2[i],
    sectionId : 2,
    createdAt : new Date,
    updatedAt : new Date
  } 
  categories.push(subcategoria)
}

for (let i = 0; i < categoria3.length; i++) {
  let subcategoria = {
    nombre : categoria3[i],
    sectionId : 3,
    createdAt : new Date,
    updatedAt : new Date
  } 
  categories.push(subcategoria)
}

for (let i = 0; i < categoria4.length; i++) {
  let subcategoria = {
    nombre : categoria4[i],
    sectionId : 4,
    createdAt : new Date,
    updatedAt : new Date
  } 
  categories.push(subcategoria)
}

for (let i = 0; i < categoria5.length; i++) {
  let subcategoria = {
    nombre : categoria5[i],
    sectionId : 5,
    createdAt : new Date,
    updatedAt : new Date
  } 
  categories.push(subcategoria)
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('categories', categories, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('categories', null, {});
     
  }
};
