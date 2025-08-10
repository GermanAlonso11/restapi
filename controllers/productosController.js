const Producto = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

//Configuración de multer para subir archivos
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {  
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'), false)
        }
    }
}

//Pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

//Subir un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({ mensaje: error });
        }
        return next();
    });
}


//Agregar nuevos productos
exports.nuevoProducto = async (req, res) => {
    const producto = new Producto(req.body);

    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({ mensaje: 'Producto agregado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agregar el producto');
    }
}


//Mostrar todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Producto.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los productos');
    }
}

//Mostrar un producto en específico
exports.mostrarProducto = async (req, res, next) => {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
        return next();
    }

    res.json(producto);
}

//Actualizar un producto
exports.actualizarProducto = async (req, res) => {
    let producto = await Producto.findById(req.params.id);

    if (!producto) {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
        return;
    }

    //Actualizar los datos
    producto = Object.assign(producto, req.body);

    try {
        if (req.file) {
            producto.imagen = req.file.filename;
            
        }else {
        producto.imagen = producto.imagen; // Mantener la imagen existente
    }
        await producto.save();
        res.json({ mensaje: 'Producto actualizado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el producto');
    }

}

//Eliminar un producto por id
exports.eliminarProducto = async (req, res) => {
    try {
        //Eliminar el producto
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
            return;
        }
        await Producto.findOneAndDelete({ _id: req.params.id });
        //Eliminar la imagen del servidor
        const imagenPath = __dirname + '../../uploads/' + producto.imagen;
        fs.unlink(imagenPath, (error) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error al eliminar la imagen');
            } else {
                res.json({ mensaje: 'Producto eliminado correctamente' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el producto');
    }
}
