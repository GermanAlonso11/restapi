const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Crear servidor
const app = express();

//Conectar a mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/restapis', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.log(err));

//Habilitar body parser /Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Rutas de la app
app.use('/', routes());

//Puerto
app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});