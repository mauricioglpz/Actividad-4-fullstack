const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// RUTAS (Importamos desde la carpeta routes)
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos'); 
const tareasRoutes = require('./routes/tareas');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/miapp')
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log(err));

app.use('/api', authRoutes);
app.use('/api/productos', productosRoutes); // Usa el archivo de routes/productos.js
app.use('/api/tareas', tareasRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});


