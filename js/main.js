const ventas = [
    {precio: 8000, categoria: 'Zapatillas', pago: 'Credito'},
    {precio: 4500, categoria: 'Pantalon', pago: 'Debito'},
    {precio: 1900, categoria: 'Remera', pago: 'Debito'}
]

// Constructor de ventas
class Venta {
    constructor(precio, categoria, pago){
        this.precio = precio;
        this.categoria = categoria;
        this.pago = pago;
    }
}

// Agregar ventas
ventas.push(new Venta(4000, 'Campera', 'Efectivo'));
ventas.push(new Venta(2900, 'Buzo', 'Debito'));

const ingresarVentas = () => {
    let pregunta = prompt('Desea ingresar una venta?\n1- SI\n2- NO');
    while(pregunta == 1){
        const entradaPrecio = Number(prompt('Precio de la venta:'));
        const entradaCategoria = prompt('Categoria de la venta:');
        const entradaPago = prompt('Forma de pago:');
        ventas.push(new Venta(entradaPrecio, entradaCategoria, entradaPago));
        pregunta = prompt('Desea ingresar una venta?\n1- SI\n2- NO');
    }
}

ingresarVentas();

const resumenVentas = () => {
    let resumen = 'VENTAS:\n';
    let totalGanancias = 0;
    
    for(let i = 0; i < ventas.length; i++){
        const precioVenta = ventas[i].precio;
        const categoriaVenta = ventas[i].categoria;
        const pagoVenta = ventas[i].pago;
        totalGanancias += precioVenta;
        resumen += `Venta ${i + 1}. $${precioVenta} - ${categoriaVenta} - ${pagoVenta}\n`
    }
    resumen += `----------------------\nTOTAL: $${totalGanancias}`;

    return resumen;
}

const resumenVentasOrd = () => {
    // Copia del Array de ventas
    let arrOrdenado = ventas.slice();

    // Ordenar de Mayor a Menor
    arrOrdenado.sort((a, b) =>  b.precio - a.precio);

    let resumenOrdenado = 'MAYOR A MENOR:\n'

    for(let i = 0; i < arrOrdenado.length; i++){
        resumenOrdenado += `${i + 1}. $${arrOrdenado[i].precio} - ${arrOrdenado[i].categoria} - ${arrOrdenado[i].pago}\n`
    }
    return resumenOrdenado;
}

console.log(resumenVentas());
console.log(resumenVentasOrd());