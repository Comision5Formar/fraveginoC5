'use strict';

const secciones = ['Tv, Audio y Video','Celulares, Notebooks y Tecnología','Electrodomésticos y Aires', 'Hogar, Muebles y Jardin', 'Salud, Belleza y Fitness']

const sections = [];

for (let i = 0; i < secciones.length; i++) {
  let seccion = {
    nombre : secciones[i],
    createdAt : new Date,
    updatedAt : new Date
  } 
  sections.push(seccion)
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('sections', sections, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('sections', null, {});
     
  }
};
