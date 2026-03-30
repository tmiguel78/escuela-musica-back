const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const dbConnection = require('./config/db');
const TeacherApiRoutes = require('./routes/teacherApiRoutes');
const BulletinApiRoutes = require('./routes/bulletinApiRoutes');
const InstrumentApiRoutes = require('./routes/instrumentApiRoutes');
const router = express.Router();
const cors = require('cors');

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

router.get('/', (req,res) => {
    res.json({ mensaje: 'Hola que tal'})
})

app.use(router)

app.use('/api', TeacherApiRoutes)
app.use('/api', BulletinApiRoutes)
app.use('/api', InstrumentApiRoutes)

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
});
