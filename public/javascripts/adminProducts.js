console.log('JS adminProducts success');

const productsBox = document.getElementById('productsBox');
const selectOrder = document.getElementById('order');
const selectLimit = document.getElementById('limit');
const paginationBox = document.getElementById('paginationBox');

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

selectLimit.addEventListener('change',()=> {
    pagination(JSON.parse(localStorage.getItem('productos')),selectLimit.value,1)
})

const pagination = (array,limit,current) => {
    const total = array.length;
    const pages = Math.ceil(total/limit);
    sessionStorage.setItem('pages',pages);

    paginationBox.innerHTML = '<li class="page-item goFirst" hidden><a class="page-link" href="">&laquo</a></li>'

    for (let i = 1; i <= pages; i++) {
        let page = `
        <li class="page-item ${current == i ? 'active' : ''}" id="pag${i}">
            <a class="page-link" href="">${i}</a>
        </li>`
        paginationBox.innerHTML += page
    }

    paginationBox.innerHTML += '<li class="page-item goLast"><a class="page-link" href="">&raquo</a></li>'

    let productos = array.slice(0,limit)

    viewProducts(productos)

}

paginationBox.addEventListener('click',(e)=> {
    e.preventDefault();
    const goFirstPage = document.querySelector('.goFirst');
    const goLastPage = document.querySelector('.goLast');

    const page = e.target.parentElement;
    const pages = document.querySelectorAll('.page-item');

    pages.forEach(page => page.classList.remove('active'));
    page.classList.add('active');

    page.innerText == 1 ? goFirstPage.setAttribute('hidden',true) : goFirstPage.removeAttribute('hidden');

    page.innerText == sessionStorage.getItem('pages') ? goLastPage.setAttribute('hidden',true) : goLastPage.removeAttribute('hidden');

    if(page.classList.contains('goFirst')){
        pages.forEach(item => item.innerText == 1 ? item.classList.add('active') : item.classList.remove('active'));
        goFirstPage.setAttribute('hidden',true);
        return goPage(JSON.parse(localStorage.getItem('productos')),selectLimit.value,1);
    }

    if(page.classList.contains('goLast')){
        pages.forEach(item => item.innerText == sessionStorage.getItem('pages') ? item.classList.add('active') : item.classList.remove('active'));
        goLastPage.setAttribute('hidden',true);
        return goPage(JSON.parse(localStorage.getItem('productos')),selectLimit.value,sessionStorage.getItem('pages'));
    }

    goPage(JSON.parse(localStorage.getItem('productos')),selectLimit.value,page.innerText)

})

const goPage = (array,limit,current) => {
    let offset = (limit * current) - limit;
    let productos = array.slice(offset,limit * current);

    viewProducts(productos)

}  