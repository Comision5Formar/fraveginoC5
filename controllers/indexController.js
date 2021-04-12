const db = require('../database/models');
const {Op, Sequelize} = require('sequelize');



module.exports = {
    index : (req,res) => {
        let categorias = db.Category.findAll()
        let destacados = db.Product.findAll({
           limit : 12,
           order: Sequelize.literal('rand()'),
           include : [
               {association : 'imagenes'}
           ]
        })
        let ofertas = db.Product.findAll({
            limit : 12,
            where : {
                descuento : {
                    [Op.lt] : 20
                }
            }
        })
        Promise.all([categorias,destacados,ofertas])
        .then(([categorias,destacados,ofertas])=> {
            
            !req.session.carrito ? req.session.carrito = [] : null

            res.render('index',{
                categorias,
                destacados
            })

        })
    }
}