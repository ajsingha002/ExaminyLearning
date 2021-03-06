const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const db = require('./database');
var multer = require('multer');
const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard');
const usersRouter = require('./routes/users');
const apiCRUDSRouter = require('./routes/apiCRUDS');
const apiJOINSRouter = require('./routes/apiJOINS');
const apiUploadRouter = require('./routes/apiUpload');
const apiDownloadRouter = require('./routes/apiDownload');

const app = express();

db.authenticate()
  .then( () => {
    console.log('Connection has been established successfully.');
  })
  .catch (error => console.error('Unable to connect to the database:', error));

// view engine setup
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
	defaultLayout: 'layout',
	extname: 'hbs',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter)
app.use('/users', usersRouter);
app.use('/api/CRUDS/', apiCRUDSRouter);
app.use('/api/JOINS/', apiJOINSRouter);
app.use('/api/files/upload/', apiUploadRouter);
app.use('/api/files/download/', apiDownloadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
