let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let app = express();
let ev = require('express-validation');
let jsonResponse = require("./helpers/jsonResponse");


let v1Controller = require('./controllers/v1/index');
let db = require('./controllers/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/KhaneBeDoosh/api/v1/', require('./middlewares/auth'));

app.use('/KhaneBeDoosh/api/v1/', v1Controller);
app.use('/db', db);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  if (err instanceof ev.ValidationError) {
        console.log(err);
      let data = jsonResponse.error(err.status, err.message);
      return res.status(err.status).json(data);
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
