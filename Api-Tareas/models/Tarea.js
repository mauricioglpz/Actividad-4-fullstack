const mongoose = require('mongoose');
const TareaSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    usuario: String 
});
module.exports = mongoose.model('Tarea', TareaSchema);
