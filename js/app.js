fetch("js/data.json")
    .then(response => response.json())
    .then(products => {
        const saveProducts = prods => localStorage.setItem('products', JSON.stringify(prods));
        saveProducts(products);

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

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
            } else {
                selectedProd.quantity = 1;
                cart.push(selectedProd);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            showCart();
        }

        const showCart = () => {
            let elem = '';
            let cantidad = 0;
            cart.forEach(prod => {
                cantidad += prod.quantity;
                elem += `
                <tr data-key="${prod.id}">
                    <td><img class="table__prodImg" src="${prod.frontImg}" alt=""></td>
                    <td>${prod.name}</td>
                    <td class="table__alignCenter"><span class="table__sumar">+</span> ${prod.quantity} <span class="restar">-</span></td>
                    <td><i class="table__delete fas fa-trash"></i></td>
                </tr>`
            })
            cartTableBody.innerHTML = elem;
            if (cart.length >= 1) cartNumber.classList.remove('hidden');
            cartNumber.innerHTML = cantidad;
        }

        if (cart) showCart();

        cartBtn.onclick = () => {
            cartElementsContainer.classList.toggle('hidden');
        }

        const cartSumar = [...document.querySelectorAll('.table__sumar')];
        const cartRestar = [...document.querySelectorAll('.table__restar')];
        cartSumar.forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedId = Number(btn.parentNode.parentNode.dataset.key)
                const selectedProd = cart.find(e => e.id === selectedId);
                selectedProd.quantity++;
                showCart();
            })
        })

    })





