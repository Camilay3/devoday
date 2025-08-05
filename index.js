const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({path:'./.env'});

const app = express();
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

// Partials
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

// Definindo rotas
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.use('/criar', require('./routes/auth'))

app.use(function(req, res) {
    res.status(404).render('erros');
});

// Ativa os serviços que precisam executar quando o servidor liga
require("./services");

app.listen(3000, () => {
    console.log("Servidor ligado")
});

/*
POST => inserir
GET => Buscar um/mais
PUT => alterar
DELETE => remover
*/
