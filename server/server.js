import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("solicitud de inicio");
});


/** api routes */
app.use('/api', router)

/** start server only when we have valid connection  - comenzar servidor solo cuando este validada la conexion*/
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Servidor connectado a http://localhost:${port}`);
        })
    } catch (error) {
        console.log('No se puede conectar al servidor')
    }
}).catch(error => {
    console.log("¡Conexión de base de datos no válida...!");
})

