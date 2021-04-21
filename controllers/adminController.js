const db = require('../database/models');

module.exports = {
    index : (req, res) => {
        return res.render('admin/index')
    },
    products : (req,res) => {
        return res.render('admin/products')
    },
    getProducts : (req,res) => {
        db.Product.findAll({
            include : [
                {association : 'categoria'}
            ]
        })
        .then(productos => {
            return res.status(200).json({
                productos
            })
        })
        .catch(error => console.log(error))
    }
}