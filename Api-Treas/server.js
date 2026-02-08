const express = require('express');
const bodyParser = require('body-parser');

const tareasRoutes = require('./routes/tareas');
const authRoutes = require('./routes/auth');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.use('/api', authRoutes);
app.use('/api/tareas', tareasRoutes);


app.get('/', (req, res) => {
    res.json({ mensaje: 'API de tareas funcionando correctamente' });
});


app.use(errorMiddleware);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


