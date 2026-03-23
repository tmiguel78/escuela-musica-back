const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const dbConnection = require('./config/db');

const router = express.Router();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

router.get('/', (req,res) => {
    res.json(`<p>Hola mundo</p>`)
})

app.use(router)

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
});