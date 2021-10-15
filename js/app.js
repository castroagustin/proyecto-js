fetch("js/data.json")
    .then(response => response.json())
    .then(products => {
        const saveProducts = prods => localStorage.setItem('products', JSON.stringify(prods));
        saveProducts(products);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const cartBtn = document.querySelector('.nav__cartIcon');
        const cartElementsContainer = document.querySelector('.nav__cartElContainer');
        const cartElementsTable = document.querySelector('.cart__table');
        const cartTableBody = document.querySelector('.cart__tableBody');
        const cartNumber = document.querySelector('.nav__cartNumber');

        const productsOffersContainer = $('.sectionOffers__container');
        const productsNewArrivalContainer = $('.sectionNewArrival__container');

        const seeMoreOffersBtn = document.querySelector('#seeMoreOffers');
        const seeMoreNewSeasonBtn = document.querySelector('#seeMoreNewSeason');

        class Producto {
            constructor(obj) {
                this.name = obj.name;
                this.price = obj.price;
                this.image = obj.image;
                this.stock = obj.stock;
                this.id = obj.id;
                this.discount = obj.discount;
                this.discountMoney = obj.discountMoney;
                this.newSeason = obj.newSeason;
            }
        }

        const productsOffer = products.filter(e => e.discount);
        const productsOfferSorted = productsOffer.sort((a, b) => b.discount - a.discount);

        const productsNewArrival = products.filter(e => e.newArrival);

        const numberFormat = new Intl.NumberFormat('es-ES');

        const productCreator = prod => {
            return `
        <div class="sectionSales__sale" data-key="${prod.id}">
            <div class="sale__imgContainer">
                <img src="${prod.frontImg}" class="sale__img">
            </div>
            <div class="sale__text">
                <p class="sale__title">${prod.name}</p>
                <p class="sale__price">${prod.discount ? `<span>$${prod.price + prod.discount}</span> ` : ''}$${numberFormat.format(prod.price)}</p>
                <div class="sale__addCart">Agregar al carrito</div>
            </div>
        </div>
        `
        }

        productsOfferSorted.forEach((prod, i) => {
            if (i < 4) {
                productsOffersContainer.append(productCreator(prod));
            }
        })

        productsNewArrival.forEach((prod, i) => {
            if (i < 4) {
                productsNewArrivalContainer.append(productCreator(prod))
            }
        })

        // AGREGAR AL CARRITO
        const addCart = [...$('.sale__addCart')];

        addCart.forEach(btn => {
            btn.addEventListener('click', () => {
                const prodId = Number(btn.parentNode.parentNode.dataset.key);
                addToCart(prodId);
                if (cartElementsContainer.classList.contains('hidden')) {
                    cartElementsContainer.classList.remove('hidden');
                    setTimeout(() => {
                        cartElementsContainer.classList.add('hidden')
                    }, 2000);
                }
            })
        })

        const addToCart = (prodId) => {
            const selectedProd = products.find(e => e.id === prodId);
            const cartProd = cart.find(e => e.id === prodId);
            if (cart.some(e => e.id === prodId)) {
                cartProd.quantity++;
                showLastCart(cartProd);
            } else {
                selectedProd.quantity = 1;
                showLastCart(selectedProd);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            // showCart();
        }

        const productCartCreator = prod => {
            return `
            <tr id="cartRow-${prod.id}" data-key="${prod.id}">
                <td><img class="table__prodImg" src="${prod.frontImg}" alt=""></td>
                <td>${prod.name}</td>
                <td class="table__alignCenter"><span class="table__sumar">+</span> <span id="cartNumber">${prod.quantity}</span> <span class="table__restar">-</span></td>
                <td><i class="table__delete fas fa-trash"></i></td>
            </tr>`
        }

        const updateBtn = () => {
            const cartSumarRestarBtn = [...document.querySelectorAll('.table__sumar'), ...document.querySelectorAll('.table__restar')];
            const cartDeleteBtn = [...document.querySelectorAll('.table__delete')];
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
            cart.forEach(prod => {
                cantidad += prod.quantity;
                elem += productCartCreator(prod);
            })
            cartTableBody.innerHTML = elem;
            updateBtn();
            if (cart.length >= 1) cartNumber.classList.remove('hidden');
            cartNumber.innerHTML = cantidad;
        }
        if (cart) showCart();

        const showLastCart = prod => {
            if (cart.some(e => e.id === prod.id)) {
                const selectedRow = cartTableBody.querySelector(`#cartRow-${prod.id}`);
                const selectedNumber = selectedRow.querySelector('#cartNumber');
                selectedNumber.innerHTML = prod.quantity;
            } else {
                cartTableBody.innerHTML += productCartCreator(prod);
                cart.push(prod);
            }
            cartNumber.innerHTML++
            updateBtn();
        }

        cartBtn.onclick = () => {
            cartElementsContainer.classList.toggle('hidden');
        }

        const sumarRestarCarrito = btn => {
            const selectedId = Number(btn.parentNode.parentNode.dataset.key)
            const selectedProd = cart.find(e => e.id === selectedId);
            const selectedRow = cartTableBody.querySelector(`#cartRow-${selectedId}`);
            const selectedNumber = selectedRow.querySelector('#cartNumber');

            if (btn.innerHTML === '+') {
                selectedProd.quantity += 1;
                selectedNumber.innerHTML = Number(selectedNumber.innerHTML) + 1;
                cartNumber.innerHTML++;
            } else {
                selectedProd.quantity -= 1;
                selectedNumber.innerHTML = Number(selectedNumber.innerHTML) - 1;
                cartNumber.innerHTML--;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        const borrarCarrito = btn => {
            const selectedId = Number(btn.parentNode.parentNode.dataset.key)
            const selectedProd = cart.find(e => e.id === selectedId);
            const selectedRow = cartTableBody.querySelector(`#cartRow-${selectedId}`);
            cartNumber.innerHTML -= selectedProd.quantity;
            delete selectedProd.quantity;
            cart = cart.filter(e => e.id !== selectedId);
            localStorage.setItem('cart', JSON.stringify(cart));
            cartTableBody.removeChild(selectedRow);
        }

    })





