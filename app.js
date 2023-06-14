const express = require('express');
const app = express();
const router = require('./router/router');
const cors = require('cors');
const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen (port, function (request, response){
    console.log('Servidor roando na porta ' + port);
});