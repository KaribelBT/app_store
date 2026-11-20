# App Store 

Challenge Alkemylabs 

## Tecnologías utilizadas

- Node.js
- Libreria Nodemon
- Libreria Express
- Libreria Sequelize
- Libreria Cors
- Libreria BodyParser
- JSON Web Token (JWT)
- MySQL
- Postman 
- React JS
- Bootstrap

### Paso 1: Clonar Proyecto:

Clonar repositorio desde el [siguiente link](https://github.com/KaribelBT/app_store)

Abrir terminal y ejecutar 

`git clone https://github.com/KaribelBT/app_store`

### Paso 2: Instalar dependencias 

En el directorio donde se clonó el proyecto, dentro de la carpeta `server` ejecutar desde la terminal:

`npm install`

Luego, dentro de la carpeta `front`, nuevamente ejecutar desde la terminal:

`npm install`

### Paso 3: Configurar contraseña Json Web Token

- Abrir el archivo `config_sample.js` ubicado dentro de la carpeta `server/config` del proyecto clonado
- Reemplazar el string `escribeTuContraseñaSuperSecreta` por una contraseña secreta y guardar el cambio
- Renombrar el archivo como `config.js`

### Paso 4: Crear la base de datos

- Si no tiene instalado XAMPP, por favor dirigirse a [este link](https://www.apachefriends.org/es/index.html)
- Abrir XAMPP Panel Control, iniciar los servicios de Apache y MySQL y corroborar que el puerto sobre el cual se está ejecutando la base de datos es `3306`
- Si no encuentra XAMPP Panel de Control, por terminal ejecutar:
`sudo /opt/lampp/lampp start` 
- Ingresar desde el navegador a la ruta `http://localhost/phpmyadmin/index.php`
- Abrir el archivo `db_queries.sql` ubicado dentro de la carpeta `server/data_base` del proyecto clonado
- Crear la base de datos, se puede importar el archivo o se puede copiar su contenido y pegar en la solapa de SQL

### Paso 5: Iniciar el servidor

Desde la terminal ubicandose en la carpeta `server`, ejecutar:

`node server.js`

Desde la terminal ubicandose en la carpeta `front`, ejecutar:

`npm start`

### Colección de Postman

- Si no tiene instalado Postman, por favor dirigirse a [este link](https://www.postman.com/downloads/)
- Abrir Postman, click en `File`, click en `Import`, click en `Import From Link` y pegar lo siguiente `https://www.getpostman.com/collections/e638efe768ae935f7cc8` 
- Hacer las consultas deseadas