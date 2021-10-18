'use strict';
window.onload = () => {
    const products = JSON.parse(localStorage.getItem('products'));

    const resultsContainer = document.querySelector('.results__section');
    const resultsTitle = document.querySelector('.results__title');
    const resultsSelect = document.querySelector('.results__select');

    resultsTitle.innerHTML = `${products.length} resultados`

    const numberFormat = new Intl.NumberFormat('es-ES');

    const productCreator = prod => {
        return `
            <div class="sectionSales__sale" data-key="${prod.id}">
                <div class="sale__imgContainer">
                    <img src="../${prod.frontImg}" class="sale__img">
                </div>
                <div class="sale__text">
                    <p class="sale__title">${prod.name}</p>
                    <p class="sale__price">${prod.discount ? `<span>$${numberFormat.format(prod.price + prod.discount)}</span> ` : ''}$${numberFormat.format(prod.price)}</p>
                    <div class="sale__addCart">Agregar al carrito</div>
                </div>
            </div>
            `
    }

    products.sort((a, b) => b.popularity - a.popularity).forEach(prod => {
        resultsContainer.innerHTML += productCreator(prod);
    });

    resultsSelect.addEventListener('change', () => {
        let selectedOption = resultsSelect.options[resultsSelect.selectedIndex].value;
        console.log(selectedOption);
        resultsContainer.innerHTML = ''
        sortProducts(selectedOption).forEach(prod => {
            resultsContainer.innerHTML += productCreator(prod);
        });
    });

    const sortProducts = option => {
        let arr = []
        switch (option) {
            case 'relevantes':
                arr = products.sort((a, b) => b.popularity - a.popularity);
                console.log(arr);
                break;
            case 'precioMen':
                arr = products.sort((a, b) => a.price - b.price);
                console.log(arr);
                break;
            case 'precioMay':
                arr = products.sort((a, b) => b.price - a.price);
                console.log(arr);
                break;
        }
        return arr;
    }

    cargarCarrito('../');
}
