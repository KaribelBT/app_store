const express = require('express');
const server = express();
const port = 3000;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// const secret = require('./config/config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root@127.0.0.1:3306/app_store')

server.use(bodyParser.json());

//inicia servidor
server.listen(port, () => {
    console.log('Servidor Iniciado');
});
