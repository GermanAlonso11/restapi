const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');

module.exports = function () {
    //Agregar nuevos clientes via post
    router.post('/clientes', clienteController.nuevoCliente);

    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    //Mostrar un cliente en especifico
    router.get('/clientes/:id', clienteController.mostrarCliente);

    //Actualizar un cliente
    router.put('/clientes/:id', clienteController.actualizarCliente);

    //Eliminar un cliente
    router.delete('/clientes/:id', clienteController.eliminarCliente);

    /*    Productos */
    //Agregar nuevos productos via post
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto);

    //Mostrar todos los productos
    router.get('/productos', productosController.mostrarProductos);

    //Mostrar un producto en específico
    router.get('/productos/:id', productosController.mostrarProducto);
    
    return router;
}
