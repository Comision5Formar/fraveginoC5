console.log('JS adminProducts success');

const productsBox = document.getElementById('productsBox');
const selectOrder = document.getElementById('order');
const selectLimit = document.getElementById('limit')

window.addEventListener('load', async () => {
    try {
        let response = await fetch('/admin/productos/listar');
        let result = await response.json();
        console.log(result);

        localStorage.setItem('productos',JSON.stringify(result.productos));
        let productos = JSON.parse(localStorage.getItem('productos'));

        viewProducts(productos)

    } catch (error) {
        console.log(error);
    }
})

const viewProducts = (productos) => {
    productsBox.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
        
        let item = `
        <tr>
            <th scope="row">${productos[i].id}</th>
            <td>${productos[i].nombre}</td>
            <td>${productos[i].descripcion}</td>
            <td class="text-end">$ ${productos[i].precio}</td>
            <td class="text-center">${productos[i].descuento}%</td>
            <td>${productos[i].categoria.nombre}</td>
        </tr>
        `
        productsBox.innerHTML += item
    }
}

selectOrder.addEventListener('change', () => {
    let productos = JSON.parse(localStorage.getItem('productos'));

    switch (selectOrder.value) {
        case 'nombre':
            productos.sort( (a,b) => (a.nombre > b.nombre) ? 1 : (a.nombre < b.nombre) ? -1 : 0)
            localStorage.setItem('productos',JSON.stringify(productos));
            viewProducts(productos)
            break;
        case 'mayorPrecio':
            productos.sort( (a,b) => (a.precio < b.precio) ? 1 : (a.precio > b.precio) ? -1 : 0)
            localStorage.setItem('productos',JSON.stringify(productos));
            viewProducts(productos)
            break;
        case 'menorPrecio':
            productos.sort( (a,b) => (a.precio > b.precio) ? 1 : (a.precio < b.precio) ? -1 : 0)
            localStorage.setItem('productos',JSON.stringify(productos));
            viewProducts(productos)
            break;
        case 'descuento':
            productos.sort( (a,b) => (a.descuento < b.descuento) ? 1 : (a.descuento > b.descuento) ? -1 : 0)
            localStorage.setItem('productos',JSON.stringify(productos));
            viewProducts(productos)
            break;
        case 'categoria':
            productos.sort( (a,b) => (a.categoria.nombre > b.categoria.nombre) ? 1 : (a.categoria.nombre < b.categoria.nombre) ? -1 : 0)
            localStorage.setItem('productos',JSON.stringify(productos));
            viewProducts(productos)
            break;
        default:
            productos.sort( (a,b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)
            localStorage.setItem('productos',JSON.stringify(productos));
            viewProducts(productos)
            break;
    }

})