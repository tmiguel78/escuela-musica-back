require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dbConnection = require('./config/db');
const TeacherApiRoutes = require('./routes/teacherApiRoutes');
const BulletinApiRoutes = require('./routes/bulletinApiRoutes');
const InstrumentApiRoutes = require('./routes/instrumentApiRoutes');
const cors = require('cors');
const admin = require('firebase-admin');


const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`<h2>Inicio de la API. Consultar rutas específicas:</h2>
          <h3>/api/instrument</h3>
          <h3>/api/teacher</h3>
          <h3>/api/bulletin</h3>`)
});
app.get('/api/weather', async (req, res) => {
    const apiUrl = process.env.WEATHER_API_KEY;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data)
});


app.use('/api', TeacherApiRoutes)
app.use('/api', BulletinApiRoutes)
app.use('/api', InstrumentApiRoutes)

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
});
