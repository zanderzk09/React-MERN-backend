const express = require('express');
require ('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');



//crear el server de express
const app = express();

//base de datos

dbConnection();


//directorio público

app.use( express.static('public') );

//lectura y parseo del body

app.use(cors());

app.use( express.json() );


//rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`servidor corriendo en el puerto ${process.env.PORT}`)

})

