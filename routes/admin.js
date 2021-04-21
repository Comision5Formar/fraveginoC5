var express = require('express');
var router = express.Router();

const {index,products,getProducts} = require('../controllers/adminController')
//admin
router.get('/',index);
router.get('/productos',products);
router.get('/productos/listar',getProducts)

module.exports = router