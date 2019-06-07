require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const rateLimit = require('express-rate-limit');
const Transformer = require('./utils/transformer.utils').internalError;
const Logger = require('./logger').logRequestStart;
const mongoose = require('mongoose')


const limiter = new rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0 
});

const AppRoutes = require('./routes/api.routes');

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.DATABSE_URL, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('helmet')({ frameguard: false }));

app.use(Logger)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(validator());

app.use('/api', AppRoutes);

app.enable('trust proxy');
app.use(limiter);
app.disable('x-powered-by')


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json(Transformer(res.locals.message)).end();
});

module.exports = app;
