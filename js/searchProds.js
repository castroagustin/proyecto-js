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

products.forEach(prod => {
    resultsContainer.innerHTML += productCreator(prod);
});