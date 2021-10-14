const products = JSON.parse(localStorage.getItem('products'));
const cart = JSON.parse(localStorage.getItem('cart')) || [];

const resultsContainer = document.querySelector('.results__section');
const resultsTitle = document.querySelector('.results__title');

resultsTitle.innerHTML = `${products.length} resultados`

const numberFormat = new Intl.NumberFormat('es-ES');

const productCreator = prod => {
    return `
        <div class="sectionSales__sale" id="${prod.id}">
            <div class="sale__imgContainer">
                <img src="../${prod.frontImg}" class="sale__img">
            </div>
            <div class="sale__text">
                <p class="sale__title">${prod.name}</p>
                <p class="sale__price">${prod.discount ? `<span>$${prod.price + prod.discount}</span> ` : ''}$${numberFormat.format(prod.price)}</p>
                <div class="sale__addCart">Agregar al carrito</div>
            </div>
        </div>
        `
}

products.forEach(prod => {
    resultsContainer.innerHTML += productCreator(prod);
});

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

