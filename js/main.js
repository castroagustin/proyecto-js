const productsList = document.querySelector('.products__list');
const agregarBtn = document.querySelector('.products__agregarBtn');
const borrarBtn = document.querySelector('.products__borrarBtn');
const modalInput = document.querySelector('.modal--input');
const modalMessage = document.querySelector('.modal--message');
const overlay = document.querySelector('.overlay');
const modalSubmitInput = document.querySelector('.modal__submitInput');
const modalSubmitMessage = document.querySelector('.modal__submitMessage');
const modalCancelMessage = document.querySelector('.modal__cancelMessage');
const modalClear = document.querySelector('.modal__clear');
const closeModalBtn = document.querySelector('.modal__close');

const inputProd = document.querySelector('.producto__nombre');
const inputCateg = document.querySelector('.producto__categoria');
const inputPrecio = document.querySelector('.producto__precio');
const inputStock = document.querySelector('.producto__stock');

let productos = JSON.parse(localStorage.getItem('products')) || [];

// Constructor de productos
class Producto {
    constructor(nombre, categoria, precio, stock, id){
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
        this.id = id;
        this.ventas = 0;
    }
    hayStock = (cant) => this.stock >= cant;
    restarStock = (cant) => this.stock -= cant;
    sumarStock = (cant) => this.stock += cant;
    sumarVentas = (cant) => this.ventas += cant;
}

agregarBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    modalInput.classList.remove('hidden');
});

borrarBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    modalMessage.classList.remove('hidden');
});

overlay.onclick = () => {
    overlay.classList.add('hidden');
    modalInput.classList.add('hidden');
    modalMessage.classList.add('hidden');
    clearValues();
};

closeModalBtn.onclick = () => {
    overlay.classList.add('hidden');
    modalInput.classList.add('hidden');
    modalMessage.classList.add('hidden');
    clearValues();
};

modalSubmitInput.onclick = e => {
    e.preventDefault();
    agregarProducto();
};

modalClear.onclick = () => clearValues();

modalCancelMessage.onclick = () => {
    overlay.classList.add('hidden');
    modalMessage.classList.add('hidden');
}

modalSubmitMessage.onclick = () => {
    productos = [];
    localStorage.setItem('products', JSON.stringify(productos));
    mostrarProductos();
    overlay.classList.add('hidden');
    modalMessage.classList.add('hidden');
}

const clearValues = () => {
    inputProd.value = '';
    inputCateg.value = '';
    inputPrecio.value = '';
    inputStock.value = '';
}

const agregarProducto = () => {
    const prodNombre = inputProd.value;
    const prodCateg = inputCateg.value;
    const prodPrecio = inputPrecio.value;
    const prodStock = inputStock.value;
    const prodId = productos.length + 1;
    const objProd = new Producto(prodNombre, prodCateg, prodPrecio, prodStock, prodId);
    productos.push(objProd);
    localStorage.setItem('products', JSON.stringify(productos));
    mostrarProductos();
}

const mostrarProductos = () => {
    const prodContainer = document.createElement('div');
    productos.forEach((prod) => {
        prodContainer.innerHTML += `
        <div class='list__row' id='${prod.id}'>
            <span class="row__text row__text--left">${prod.nombre}</span>
            <span class="row__text row__text--center">$${prod.precio}</span>
            <span class="row__text row__text--right">${prod.stock}</span>
        </div>
        `;
    })
    productsList.innerHTML = prodContainer.innerHTML;
}

mostrarProductos();
