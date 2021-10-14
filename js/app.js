const url = '/js/data.json'
fetch(url)
    .then(response => response.json())
    .then(data => {
        saveProducts(data);
    })

const saveProducts = prods => localStorage.setItem('products', JSON.stringify(prods));

const products = JSON.parse(localStorage.getItem('products'));

const cart = JSON.parse(localStorage.getItem('cart')) || [];

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

console.log(products);

const productsOffer = products.filter(e => e.discount);
const productsOfferSorted = productsOffer.sort((a, b) => b.discount - a.discount);

const productsNewArrival = products.filter(e => e.newArrival);

const numberFormat = new Intl.NumberFormat('es-ES');

const productCreator = prod => {
    return `
        <div class="sectionSales__sale" id="${prod.id}">
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
        /* message.classList.remove('hidden');
        setTimeout(() => {
            message.classList.add('hidden')
        }, 1500); */

        // Animaciones concatenadas JQUERY
        $('.message').animate({ top: '2rem', opacity: 1 }, 100).delay(1500).animate({ top: '-10%', opacity: 0 }, 100)

        const prodId = btn.parentNode.parentNode.id;
        addToCart(prodId);
    })
})

const addToCart = (prodId) => {
    cart.push(products.find(e => e.id == prodId));
    console.log(cart);
}

