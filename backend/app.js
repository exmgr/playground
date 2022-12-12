const dotenv = require("dotenv")
const express = require('express');
const bodyParser = require('body-parser');
const devicesRouter = require('./src/routes/device.route');
const telemetryRouter = require('./src/routes/telemetry.route');
const authService = require('./src/services/auth.service');
const errorHandler = require('./src/middlewares/error-handler.middleware');

dotenv.config()

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/health', (req, res) => {
    res.status(200)
})

app.use('/devices', devicesRouter);
app.use('/telemetries', telemetryRouter);

// login
app.set("jwt_token", authService.login());

app.use(errorHandler());

app.request


module.exports = app;

