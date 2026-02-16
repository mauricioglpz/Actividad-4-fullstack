const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    const { usuario, password } = req.body;

    const existe = await Usuario.findOne({ usuario });

    if (existe) return res.json({ mensaje: 'Usuario ya existe ' });

    await Usuario.create({ usuario, password });

    res.json({ mensaje: 'Usuario registrado ' });
};

exports.login = async (req, res) => {

    const { usuario, password } = req.body;

    const user = await Usuario.findOne({ usuario, password });

    if (!user) return res.json({ mensaje: 'Credenciales incorrectas' });

    const token = jwt.sign({ usuario }, 'secreto');

    res.json({ token });
};
