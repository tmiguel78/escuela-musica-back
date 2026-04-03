# Escuela de Música - Backend API

Backend de la aplicación **Escuela de Música**, desarrollado con **Node.js, Express y MongoDB**, encargado de gestionar los datos de profesores, instrumentos y tablón de anuncios.

Este backend está conectado con el frontend (React): https://github.com/tmiguel78/escuela-musica-front

---

## Notas

- API preparada para integración completa con frontend
- Arquitectura escalable
- Separación clara de responsabilidades
- Buenas prácticas en autenticación y subida de archivos

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Firebase
- Cloudinary
- Multer
- Render

---

## Funcionalidades

- Gestión de **profesores**
- Gestión de **instrumentos**
- Gestión de **tablón de anuncios**
- Subida de imágenes a Cloudinary
- Autenticación de administrador con Firebase
- Protección de rutas (POST, PUT, DELETE)
- API REST completa (CRUD)

---

## Autenticación

El acceso a operaciones sensibles está protegido mediante:

- Firebase Authentication (login de administrador)
- Middleware `verifyToken`
- Validación de email admin desde variables de entorno

Solo el administrador puede:

- Crear
- Editar
- Eliminar

---

## Estructura del proyecto

```bash
escuela-musica-back/
│
├── config/
│   ├── cloudinary.js
│   └── db.js                # Conexión a MongoDB
│
├── controllers/
│   ├── bulletinController.js
│   ├── teacherController.js
│   └── instrumentController.js
│
├── middlewares/
│   ├── auth.js              # Verificación de token Firebase
│   ├── upload.js            # Configuración Multer
│   └── uploadToCloudinary.js
│
├── models/
│   ├── Bulletin.js
│   ├── Teacher.js
│   └── Instrument.js
│
├── routes/
│   ├── bulletinApiRoutes.js
│   ├── teacherApiRoutes.js
│   └── instrumentApiRoutes.js
│
├── .env
├── .env.example               # Plantilla de variables de entorno
├── .gitignore
├── index.js
├── package-lock.json
└── package.json
```

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/tmiguel78/escuela-musica-back
```

Instalar dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz:

```env
PORT=3000
MONGO_URI=tu_uri_de_mongodb
ADMIN_EMAIL=email_admin
FIREBASE_SERVICE_ACCOUNT='{...json...}'
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

⚠️ Importante:

- `FIREBASE_SERVICE_ACCOUNT` debe ir como JSON string
- respetar los `\n` en la private key

---

## Ejecución

```bash
npm start
```

El servidor se ejecutará en:

```bash
http://localhost:3000
```

---

## Endpoints principales

### Bulletin

| Método | Ruta                | Descripción         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/bulletin`     | Obtener anuncios    |
| POST   | `/api/bulletin`     | Crear anuncio 🔒    |
| PUT    | `/api/bulletin/:id` | Editar anuncio 🔒   |
| DELETE | `/api/bulletin/:id` | Eliminar anuncio 🔒 |

---

### Instruments

| Método | Ruta                  | Descripción             |
| ------ | --------------------- | ----------------------- |
| GET    | `/api/instrument`     | Obtener instrumentos    |
| POST   | `/api/instrument`     | Crear instrumento 🔒    |
| PUT    | `/api/instrument/:id` | Editar instrumento 🔒   |
| DELETE | `/api/instrument/:id` | Eliminar instrumento 🔒 |

---

### Teachers

| Método | Ruta               | Descripción          |
| ------ | ------------------ | -------------------- |
| GET    | `/api/teacher`     | Obtener profesores   |
| POST   | `/api/teacher`     | Crear profesor 🔒    |
| PUT    | `/api/teacher/:id` | Editar profesor 🔒   |
| DELETE | `/api/teacher/:id` | Eliminar profesor 🔒 |

---

## Middleware de seguridad

```js
verifyToken;
```

- Extrae el token del header `Authorization`
- Verifica con Firebase
- Comprueba email admin
- Permite acceso o bloquea la petición

---

## Subida de imágenes

- Se utiliza Multer en memoria
- Se envían a Cloudinary
- Se guarda la URL en MongoDB

---

## API desplegada

La API está disponible en:

https://escuela-musica-back.onrender.com/api

⚠️ Nota:  
El servidor puede tardar unos 20 segundos en responder la primera vez debido al inicio del servidor de Render.

### Ejemplos:

- Obtener anuncios  
  https://escuela-musica-back.onrender.com/api/bulletin

- Obtener profesores  
  https://escuela-musica-back.onrender.com/api/teacher

- Obtener instrumentos  
  https://escuela-musica-back.onrender.com/api/instrument

---

## Conexión con el frontend

- Este backend está conectado con el repositorio del frontend desarrollado en React:

https://github.com/tmiguel78/escuela-musica-front

- El frontend desplegado de esta aplicación está disponible en:

https://escuela-de-musica-corcheas.netlify.app/

---

## Autor

Toño Miguel

---
