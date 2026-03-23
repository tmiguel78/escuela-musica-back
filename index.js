const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const dbConnection = require('./config/db');
const TeacherApiRoutes = require('./routes/teacherApiRoutes');

const router = express.Router();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

router.get('/', (req,res) => {
    res.json({ mensaje: 'Hola que tal'})
})

app.use(router)
app.use('/api', TeacherApiRoutes)

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
});
