const express = require('express');
const server = express();
const port = 3000;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = require('./config/config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root@127.0.0.1:3306/app_store')
const users = require('./models/users.js');
let myUser = new users.Users();
const categories = require('./models/categories.js');
let myCategory = new categories.Categories();
const apps = require('./models/apps.js');
let myApp = new apps.Apps();

server.use(bodyParser.json());

//inicia servidor
server.listen(port, () => {
    console.log('Servidor Iniciado');
});

//crea usuario
server.post('/api/users', myUser.userExist(sequelize), async (req, res) => {
    try {
        const { email, password, isDev } = req.body;
        let create = await myUser.create(sequelize, email, password, isDev);
        if (create.length > 0) {
            let user = await myUser.get(sequelize, create[0]);
            user = user[0]
            res.status(201).json({
                id: user.id,
                email: user.email,
                isDev: user.isDev
            });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' });
    }
});

//login usuario
server.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let userLogged = await myUser.login(sequelize, email, password);
        if (userLogged.length > 0) {
            const payload = {
                id: userLogged[0].id,
                email: userLogged[0].email,
                isDev: userLogged[0].isDev
            }
            const token = jwt.sign(payload, secret.secret, {
                expiresIn: 1440
            });
            res.status(200).json({ token });
            return;
        } else {
            res.status(409).json({ error: 'Conflict, user not exist or invalid password' })
        }
    } catch {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' })
    }
});

//lista categorías
server.get('/api/categories', myUser.validToken(jwt), async (req, res) => {
    let categoriesList = await myCategory.list(sequelize);
    res.status(200).json(categoriesList);
});

//lista apps por categoría
server.get('/api/categories/apps/:id', myUser.validToken(jwt), myCategory.categoryNotFound(sequelize), async (req, res) => {
    let appsList = await myCategory.listApps(sequelize, req.params.id);
    if (appsList.length > 0) {
        res.status(200).json(appsList);
    } else {
        res.status(400).json({error: "Bad request, category empty"})
    }
});

//crea apps
server.post('/api/apps', myUser.isDev(jwt), myApp.appExist(sequelize), async (req, res) => {
    try {
        const { id_category, name, price, img_url } = req.body;
        let create = await myApp.create(sequelize, id_category, name, price, img_url,req.user.id);
        if (create.length > 0) {
            let app = await myApp.get(sequelize, create[0]);
            res.status(201).json({ app });
        }
    } catch (error) {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' });
    }
});

//lista apps creadas por developer
server.get('/api/apps', myUser.isDev(jwt), async (req, res) => {
    let appsList = await myApp.listDev(sequelize, req.user.id);
    if(appsList.length > 0) {
        res.status(200).json({ appsList });
    } else {
        res.status(404).json({ error: 'Not found'});
    }
});

//modifica apps
server.put('/api/apps/:id', myUser.isDev(jwt), myApp.appNotFound(sequelize), async (req, res) => {
    try {
        const { price, img_url} = req.body;
        await myApp.update(sequelize, req.params.id, price, img_url);
        let appUpdated = await myApp.get(sequelize, req.params.id);
        appUpdated = appUpdated[0];
        res.status(200).json({ appUpdated });
    } catch {
        res.status(400).json({ error: 'Bad Request, invalid or missing input' })
    };
});

//elimina app
server.delete('/api/apps/:id', myUser.isDev(jwt), myApp.appNotFound(sequelize), async (req, res) => {
    try {
        await myApp.delete(sequelize, req.params.id);
        res.status(200).json({ message: 'Success, app deleted' });
    }
    catch{
        res.status(400).json({ error: 'Bad Request, invalid or missing input' })
    }
});