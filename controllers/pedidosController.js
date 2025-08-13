const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
  try {
    const pedido = new Pedidos(req.body);
    await pedido.save();
    // res.json({ mensaje: 'Pedido agregado correctamente' });
    res.status(201).json({ mensaje: 'Pedido creado', pedido });
  } catch (error) {
    console.error("Error al crear pedido:", error.message);
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else if (error.code === 11000) {
      res.status(400).json({ error: 'Pedido ya existe' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
    }
    }

    //Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find().populate('cliente').populate({path: 'pedido.producto',
      model: 'Productos'
    });
    res.json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}