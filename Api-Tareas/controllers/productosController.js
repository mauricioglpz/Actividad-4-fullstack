const Producto = require('../models/Producto');


exports.obtenerProductos = async (req, res) => {
    const productos = await Producto.find({ usuario: req.usuario });
    res.json(productos);
};

exports.crearProducto = async (req, res) => {

    const { nombre, precio } = req.body;

    await Producto.create({
        nombre,
        precio,
        usuario: req.usuario
    });

    res.json({ mensaje: 'Producto creado' });
};

exports.eliminarProducto = async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
};

exports.actualizarProducto = async (req, res) => {

    const { nombre, precio } = req.body;

    await Producto.findByIdAndUpdate(req.params.id, {
        nombre,
        precio
    });

    res.json({ mensaje: 'Producto actualizado ✏️' });
};
