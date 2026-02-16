const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ mensaje: 'No autorizado' });

    try {
        const decoded = jwt.verify(token, 'secreto');
        req.usuario = decoded.usuario;
        next();
    } catch {
        res.status(401).json({ mensaje: 'Token inválido' });
    }
};


