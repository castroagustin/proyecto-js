'use strict';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartBtn = document.querySelector('.nav__cartIcon');
const cartElementsContainer = document.querySelector('.nav__cartElContainer');
const cartContainer = document.querySelector('.cart__container');
const cartEmptyMsg = document.querySelector('.cart__emptyMsg');
const cartNumber = document.querySelector('.nav__cartNumber');
const cartTotal = document.querySelector('.cart__total');
const cartTotalNumber = document.querySelector('.cart__totalNumber');

const numberFormat = new Intl.NumberFormat('es-ES');

const cargarCarrito = (imgSrc) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const addCart = [...document.querySelectorAll('.sale__addCart')];

    addCart.forEach(btn => {
        btn.addEventListener('click', () => {
            const prodId = Number(btn.parentNode.parentNode.dataset.key);
            addToCart(prodId);
            if (cartElementsContainer.classList.contains('d-none')) {
                cartElementsContainer.classList.remove('d-none');
                setTimeout(() => {
                    cartElementsContainer.classList.add('d-none')
                }, 2000);
            }
        })
    })

    const addToCart = (prodId) => {
        const selectedProd = products.find(e => e.id === prodId);
        console.log(selectedProd);
        const cartProd = cart.find(e => e.id === prodId);
        if (cart.some(e => e.id === prodId)) {
            cartProd.quantity++;
            showLastCart(cartProd);
        } else {
            selectedProd.quantity = 1;
            showLastCart(selectedProd);
        }
        if (cart.length >= 1) cartNumber.classList.remove('hidden');
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartStates();
    }

    const productCartCreator = (prod, imgSrc) => {
        return `
                <div class="cart__row" id="cartRow-${prod.id}" data-key=${prod.id}>
                    <img class="cart__prodImg" src="${imgSrc === undefined ? '' : imgSrc}${prod.frontImg}"></img>
                    <div class="cart__prodText">
                        <div>
                            <p class="cart__prodName">${prod.name}</p>
                            <span class="cart__prodPrice">$${numberFormat.format(prod.price * prod.quantity)}</span>
                        </div>
                        <div class="cart__cantidadContainer">
                            <i class="cart__sumar fas fa-plus"></i>
                            <span class="cart__cantidad" id="cartNumber">${prod.quantity}</span>
                            <i class="cart__restar fas fa-minus"></i>
                       </div>
                    </div>
                    <i class="cart__delete fas fa-times"></i>
                </div>`
    }

    const updateBtn = () => {
        const cartSumarRestarBtn = [...document.querySelectorAll('.cart__sumar'), ...document.querySelectorAll('.cart__restar')];
        const cartDeleteBtn = [...document.querySelectorAll('.cart__delete')];
        cartDeleteBtn.forEach(btn => {
            btn.onclick = () => borrarCarrito(btn);
        })
        cartSumarRestarBtn.forEach(btn => {
            btn.onclick = () => sumarRestarCarrito(btn);
        })
    }

    const showCart = () => {
        let elem = '';
        let cantidad = 0;
        let totalPrice = 0;
        cart.forEach(prod => {
            cantidad += prod.quantity;
            totalPrice += prod.price * prod.quantity;
            elem += productCartCreator(prod, imgSrc);
        })
        cartTotalNumber.innerHTML = `$${numberFormat.format(totalPrice)}`;
        cartContainer.innerHTML = elem;
        updateBtn();
        if (cart.length >= 1) cartNumber.classList.remove('hidden');
        cartNumber.innerHTML = cantidad;
    }
    if (cart) showCart();

    const showLastCart = prod => {
        if (cart.some(e => e.id === prod.id)) {
            const selectedRow = cartContainer.querySelector(`#cartRow-${prod.id}`);
            const selectedNumber = selectedRow.querySelector('#cartNumber');
            const selectedPrice = selectedRow.querySelector('.cart__prodPrice');
            selectedNumber.innerHTML = prod.quantity;
            selectedPrice.innerHTML = '$' + numberFormat.format(prod.price * prod.quantity);
        } else {
            cartContainer.innerHTML += productCartCreator(prod, imgSrc);
            cart.push(prod);
        }
        cartTotalNumber.innerHTML = '$' + numberFormat.format(Number(cartTotalNumber.innerHTML.substring(1).replace(/\./g, '')) + prod.price);
        cartNumber.innerHTML++
        updateBtn();
    }

    /* document.addEventListener('mousemove', () => {
        console.log(cartBtn.matches(':hover'));
    }) */

    cartBtn.onclick = () => {
        cartElementsContainer.classList.toggle('d-none');
    }

    const updateCartStates = () => {
        if (cart.length <= 0) {
            cartNumber.classList.add('hidden');
            cartEmptyMsg.classList.remove('d-none');
            cartTotal.classList.add('d-none');
        } else {
            cartNumber.classList.remove('hidden');
            cartEmptyMsg.classList.add('d-none');
            cartTotal.classList.remove('d-none');
        }
    }

    updateCartStates();

    const sumarRestarCarrito = btn => {
        const selectedId = Number(btn.parentNode.parentNode.parentNode.dataset.key)
        const selectedProd = cart.find(e => e.id === selectedId);
        const selectedRow = cartContainer.querySelector(`#cartRow-${selectedId}`);
        const selectedNumber = selectedRow.querySelector('#cartNumber');
        const selectedPrice = selectedRow.querySelector('.cart__prodPrice');

        if (btn.classList.contains('cart__sumar')) {
            selectedProd.quantity += 1;
            selectedNumber.innerHTML = Number(selectedNumber.innerHTML) + 1;
            cartNumber.innerHTML++;
            cartTotalNumber.innerHTML = '$' + numberFormat.format(Number(cartTotalNumber.innerHTML.substring(1).replace(/\./g, '')) + selectedProd.price);
        } else {
            selectedProd.quantity -= 1;
            cartTotalNumber.innerHTML = '$' + numberFormat.format(Number(cartTotalNumber.innerHTML.substring(1).replace(/\./g, '')) - selectedProd.price);
            if (selectedProd.quantity === 0) {
                delete selectedProd.quantity;
                cart = cart.filter(e => e.id !== selectedId);
                cartContainer.removeChild(selectedRow);
                updateCartStates();
            }
            selectedNumber.innerHTML = Number(selectedNumber.innerHTML) - 1;
            cartNumber.innerHTML--;
        }
        selectedPrice.innerHTML = '$' + numberFormat.format(selectedProd.price * selectedProd.quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const borrarCarrito = btn => {
        const selectedId = Number(btn.parentNode.dataset.key)
        const selectedProd = cart.find(e => e.id === selectedId);
        const selectedRow = cartContainer.querySelector(`#cartRow-${selectedId}`);
        cartNumber.innerHTML -= selectedProd.quantity;
        cartTotalNumber.innerHTML = '$' + numberFormat.format(Number(cartTotalNumber.innerHTML.substring(1).replace(/\./g, '')) - selectedProd.price * selectedProd.quantity);
        delete selectedProd.quantity;
        cart = cart.filter(e => e.id !== selectedId);
        localStorage.setItem('cart', JSON.stringify(cart));
        cartContainer.removeChild(selectedRow);
        updateCartStates();
    }
}

