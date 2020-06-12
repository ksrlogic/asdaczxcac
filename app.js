var createError = require('http-errors');
var express = require('express');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const passport = require("passport");
const Schema = mongoose.Schema;

var app = express();

mongoose.connect(
  "mongodb+srv://KSR:fifa2035@cluster0-pbtbp.mongodb.net/skkustudy?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(
  session({
    secret: "@#@$MYSIGN#@$#$",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    ttl: 14 * 24,
  })
);
// Works
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// const lex = require('greenlock-express').create({
//   version: 'draft-11', // 버전2
//   configDir: '/etc/letsencrypt', // 또는 ~/letsencrypt/etc
//   server: 'https://acme-staging-v02.api.letsencrypt.org/directory',// 배포시 https://acme-v02.api.letsencrypt.org/directory로 변환
//   approveDomains: (opts, certs, cb) => {
//     if (certs) {
//       opts.domains = [''];
//     } else {
//       opts.email = 'ksrlogic@naver.com';
//       opts.agreeTos = true;
//     }
//     cb(null, { options: opts, certs });
//   },
//   renewWithin: 81 * 24 * 60 * 60 * 1000,
//   renewBy: 80 * 24 * 60 * 60 * 1000,
// });

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
