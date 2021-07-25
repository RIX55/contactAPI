const express = require('express');
const app = express();
const morgan = require('morgan');
const handle = require('express-handlebars')
const path = require('path');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handle({
    defaultLayout:'main',
    extname:'.hbs'
}));
app.set('view engine', '.hbs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index'));

//static files(public)
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;