let express = require('express');

let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
// jwt
let secureRoutes = express.Router();

process.env.SECRET_KEY = 'mybadasskey';

let index = require('./routes/index');
let users = require('./routes/users');
let authenticateController = require('./routes/authenticateController');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
//Validation MiddleWare
secureRoutes.use((req,res, next)=>{
  "use strict";
    const token = req.token || req.headers["token"];

    if(token) {
      res.send('We have a token');
    } else {
      res.send('Please a send token');
    }

});

// ROUTES API
app.use('/api/authenticate', authenticateController);
app.use('/', index);
app.use('/api/test', index);
secureRoutes.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
