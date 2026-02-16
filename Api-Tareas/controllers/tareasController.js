const Tarea = require('../models/Tarea');

exports.obtenerTareas = async (req, res) => {
    const tareas = await Tarea.find({ usuario: req.usuario });
    res.json(tareas);
};

exports.crearTarea = async (req, res) => {
    const { titulo, descripcion } = req.body;

    await Tarea.create({
        titulo,
        descripcion,
        usuario: req.usuario
    });

    res.json({ mensaje: 'Tarea creada ' });
};

exports.eliminarTarea = async (req, res) => {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Tarea eliminada ' });
};
