const db = require('../database/models');

const verificar =  (carrito, id) => {
    let pos = -1;
    for (let i = 0; i < carrito.length; i++) {
        
        if(carrito[i].id == id){
            pos = i
            break
        }
    }
    return pos
}

module.exports = {
    agregarItem : (req,res) => {
        let carrito = req.session.carrito;
        let id = req.params.id;

        db.Product.findOne({
            where : {
                id
            },
            include : [
                {association : 'categoria'},
                {association : 'imagenes'}
            ]
        })
        .then(producto => {
            let pos = verificar(carrito,id)

            if(pos == -1) {
                let item = {
                    id : producto.id,
                    nombre : producto.nombre,
                    imagen : producto.imagenes[0].link,
                    precio : producto.precio,
                    total : producto.precio,
                    cantidad : 1
                };
                carrito.push(item)

            }else{

                let item = carrito[pos]
                item.cantidad = item.cantidad + 1
                item.total = item.cantidad * item.precio
                carrito[pos] = item
            }
            req.session.carrito = carrito
            res.status(200).json(req.session.carrito)
        })


    },
    quitarItem : (req,res) => {
        let carrito = req.session.carrito;
        let id = req.params.id;

        let pos = verificar(carrito,id)

        let item  = carrito[pos]

        if(item.cantidad > 1){
            item.cantidad = item.cantidad - 1
            item.total = item.cantidad * item.precio
            carrito[pos] = item
            req.session.carrito = carrito
            return res.status(200).json(req.session.carrito)
        }else{
            carrito.splice(item,1)
            req.session.carrito = carrito
            return res.status(200).json(req.session.carrito)
        }


    },
    mostrarCarrito : (req,res) => {
        return res.status(200).json(req.session.carrito)
    },
    vaciarCarrito : (req,res) => {
        req.session.carrito = []
        return res.status(200).json(req.session.carrito)
    }
}