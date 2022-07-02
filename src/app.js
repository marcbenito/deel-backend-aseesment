const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');

const routes = require('./router');

const app = express();

app.use(bodyParser.json());

sequelize
    .getQueryInterface()
    .showAllSchemas()
    .then((tableObj) => {
        if (tableObj < 3) {
            console.log('=== 💣 Error: Inconsistent DB..');
        }
    })
    .catch((err) => {
        console.log('=== 💣 An error ocurred trying to connect to DB:', err);
    });
//app.set('sequelize', sequelize)
//app.set('models', sequelize.models)

routes(app);

module.exports = app;
