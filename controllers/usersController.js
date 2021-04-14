const {validationResult} = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcrypt');


module.exports = {
    register : (req,res) => {
        res.render('register')
    },
    processRegister : (req,res) => {
        let errores = validationResult(req);

        if(errores.isEmpty()){
            const {nombre, email, pass} = req.body;
            db.User.create({
                name : nombre.trim(),
                email,
                pass : bcrypt.hashSync(pass,12),
                rol : "user"
            })
            .then(()=>res.redirect('/users/login'))
            .catch(error => res.send(error))
        }else{
            return res.render('register',{
                errores : errores.mapped(),
                old: req.body
            })
        }
    },
    login : (req,res) => {
        res.render('login')
    },
    processLogin : (req,res) => {
        let errores = validationResult(req);
        if(errores.isEmpty()){
            const {email, pass, recordar} = req.body;

            db.User.findOne({
                where : {
                    email
                }
            })
            .then(user => {
                if(user && bcrypt.compareSync(pass, user.pass)){
                    req.session.userLogin = {
                        id : user.id,
                        name : user.name,
                        email : user.email,
                        rol : user.rol,
                        avatar : user.avatar
                    }

                    if(recordar){
                        res.cookie('fravegino',req.session.userLogin, {
                            maxAge : 1000 * 60
                        })
                    }

                    if(req.session.carrito.length != 0){
                        db.Order.findOne({
                            where : {
                                userId : req.session.userLogin.id,
                                status : 'pending'
                            },
                            include : [
                                {
                                    association : 'carrito',
                                    include : [
                                        {
                                            association : 'producto',
                                            include : [
                                                {association : 'imagenes'}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        })
                        .then(orden => {
                            if(orden) {
                                let carritoNew = req.session.carrito;
                                req.session.carrito = [];
                                orden.carrito.forEach(item => {
                                    let producto = {
                                        id : item.producto.id,
                                        nombre : item.producto.nombre,
                                        imagen : item.producto.imagenes[0].link,
                                        precio : item.producto.precio,
                                        cantidad : +item.cantidad,
                                        total : +item.producto.precio * +item.cantidad,
                                        ordenId : order.id
                                    }
                                    req.session.carrito.push(producto)
                                });
                                req.session.carrito = [
                                    ...req.session.carrito,
                                    ...carritoNew
                                ]
                                return res.redirect('/')

                            }else {
                                db.Order.create({
                                    userId : userLogin.id,
                                    status : 'pending'
                                })
                                .then(orden => {
                                    req.session.carrito.forEach(item => {
                                        item.orderId = orden.id

                                        db.Cart.create({
                                            userId : orden.userId,
                                            productId : item.id,
                                            cantidad : item.cantidad,
                                            orderId : orden.id
                                        })
                                    })
                                    return res.redirect('/')

                                })
                            }
                        })
                    }else{
                        
                    }
                    return res.redirect('/')

                }else {
                    return res.render('login',{
                        errores :{
                            invalid : {
                                msg : "Credenciales inválidas"
                            }
                        }
                    })
                }
            })
        }else{
            return res.render('login',{
                errores : errores.mapped(),
                old : req.body
            })
        }
    },
    logout : (req,res) => {
        req.session.destroy();
        if(req.cookies.fravegino){
            res.cookie('fravegino','', {maxAge : -1})
        }
        return res.redirect('/')
    },
    profile : (req,res) => {
        res.render('profile')
    }
}