# login-app-mern-jwt-token-auth-otp-verification
app de login con jwt token, reset password otp verification

es una app donde se usa como base de datos mongodb atlas, la función es crear un usuario, o ingresar con usuario existente
reset la clave usando OTP verificación (ethereal.email como direccion  falsa para verificar el reset de clave )

En la carpeta del cliente, cree un archivo .env y coloque este código dentro de él.
.env
```
REACT_APP_SERVER_DOMAIN='<dominio_servidor>' # ejemplo 'http://localhost:8080'
```
Después de eso, cree un archivo en la carpeta del servidor con el nombre config.js y coloque el siguiente código dentro de él.

configuración.js
```
exportar predeterminado {
    JWT_SECRET: "<secreto>",
    CORREO ELECTRÓNICO: "steve.franecki@ethereal.email", // prueba de correo electrónico y contraseña
    CONTRASEÑA: "sMf46xCzrvdrxvuagc",
    ATLAS_URI: "<MONGODB_ATLAS_URI>"
}
```

> **Nota:** El **ATLAS_URI** es importante para trabajar en este proyecto.

Ahora, cree todas estas variables en el proyecto y asegúrese de configurar la variable ATLAS_URI.
De lo contrario, el proyecto no funcionará.

recuerde hacer en cada hacer npm install - para que se installe todas las librerias
