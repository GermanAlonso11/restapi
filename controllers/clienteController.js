const Clientes = require('../models/Clientes');

//Agregar nuevos clientes
exports.nuevoCliente = async (req, res, next) => {
  try {
    const cliente = new Clientes(req.body);
    await cliente.save();
    res.json({ mensaje: 'Cliente agregado', cliente });
  } catch (error) {
    console.error("Error al guardar:", error.message);
    // Errores de validación o duplicados
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else if (error.code === 11000) { // Email duplicado
      res.status(400).json({ error: "Email ya registrado" });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

//Obtener todos los clientes
exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

//Obtener un cliente en especifico
exports.mostrarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    } else{
      res.json(cliente);
    }
    
  } catch (error) {
    console.error("Error al obtener cliente:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

//Actualizar un cliente
exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findByIdAndUpdate(req.params.id, req.body
      , { new: true, runValidators: true });
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    } else {
      res.json({ mensaje: 'Cliente actualizado', cliente });
    }
  } catch (error) {
    console.error("Error al actualizar cliente:", error.message);
  }
}

//Eliminar un cliente
exports.eliminarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    } else {
      res.json({ mensaje: 'Cliente eliminado' });
    }
  } catch (error) {
    console.error("Error al eliminar cliente:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

