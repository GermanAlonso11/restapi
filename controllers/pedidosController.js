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

//Mostrar pedido por ID
exports.mostrarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({path: 'pedido.producto',
      model: 'Productos'
    });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    console.error("Error al obtener pedido:", error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

//Actualizar un pedido por ID
exports.actualizarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    } else {
      res.json({ mensaje: 'Pedido actualizado correctamente', pedido });
    }
  } catch (error) {
    console.error("Error al actualizar pedido:", error.message);
  }
}

//Eliminar un pedido por ID
exports.eliminarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findByIdAndDelete(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json({ mensaje: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar pedido:", error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
