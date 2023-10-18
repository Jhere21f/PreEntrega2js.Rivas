class Producto {
    constructor(id, nombre, stock, precio) {
        this.id = id;
        this.nombre = nombre;
        this.stock = stock;
        this.cantidad = 0;
        this.precio = precio;
    }
}

const productos = [
    new Producto(0, "remera", 4, 10),
    new Producto(1, "pantalon gris", 5, 25),
    new Producto(2, "short", 2, 20),
    new Producto(3, "zapato", 7, 35),
    new Producto(4, "vestido", 5, 20),
    new Producto(5, "top", 5, 10),
    new Producto(6, "lentes", 3, 12),
    new Producto(7, "collar", 8, 25),
    new Producto(8, "pantalón negro", 5, 25),
    new Producto(9, "pantalón gris", 3, 25),
    new Producto(10, "blusa negra", 2, 25)
];

let carrito = [];

function mostrarProductos() {
    console.table(productos);
}

function agregarProductoAlCarrito(producto, cantidad) {
    if (producto.stock >= cantidad) {
        if (carrito.some(item => item.id === producto.id)) {
            carrito.find(item => item.id === producto.id).cantidad += cantidad;
        } else {
            producto.cantidad = cantidad;
            carrito.push({ ...producto });
        }
        producto.stock -= cantidad;
        return true;
    }
    return false;
}

function obtenerProductosSeleccionados() {
    while (true) {
        mostrarProductos();
        const eleccion = parseInt(prompt("Seleccione un artículo por su número:"));
        if (isNaN(eleccion) || eleccion < 0 || eleccion >= productos.length) {
            alert("Selección inválida. Por favor, seleccione un número válido.");
            continue;
        }
        const cantidadSeleccionada = parseInt(prompt("Ingrese la cantidad que desea llevar:"));
        if (isNaN(cantidadSeleccionada) || cantidadSeleccionada <= 0) {
            alert("Cantidad inválida. Por favor, ingrese una cantidad válida.");
            continue;
        }
        const productoSeleccionado = productos[eleccion];
        const exito = agregarProductoAlCarrito(productoSeleccionado, cantidadSeleccionada);
        if (!exito) {
            alert("No hay suficiente stock disponible.");
        }
        const agregarOtroArticulo = prompt("¿Desea comprar más artículos? (si/no)").toLowerCase();
        if (agregarOtroArticulo !== "si") {
            break;
        }
    }
    console.table(carrito);
    const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    alert("Total a pagar: " + totalCarrito.toFixed(2) + "$");
    return totalCarrito;
}

function cobrarPago(totalCarrito) {
    const monto = parseFloat(prompt("Ingrese el monto a pagar:"));
    if (isNaN(monto)) {
        alert("Monto inválido. Por favor, ingrese un monto válido.");
    } else if (monto < totalCarrito) {
        const falta = totalCarrito - monto;
        alert("Lo sentimos, le falta " + falta.toFixed(2) + "$.");
    } else {
        const vuelto = monto - totalCarrito;
        alert("Compra exitosa, su vuelto es " + vuelto.toFixed(2) + "$");
    }
}

mostrarProductos();
const totalCarrito = obtenerProductosSeleccionados();
cobrarPago(totalCarrito);
