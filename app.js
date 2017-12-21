
// 这是老代码 
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// 这是要使用express
import Router from './routes/routes.js';
import db from './mongodb'; // 使用db


// import expressWinston from 'express-winston'; // (开发过程中，日志记录是必不可少的事情，尤其是生产系统中经常无法调试，因此日志就成了重要的调试信息来源。)

// session
import session from 'express-session';
import connectMongo from 'connect-mongo';
import config from 'config-lite';

// middlewares
import {statistic} from './middlewares/Statistic'

// 
import history from 'connect-history-api-fallback' // 不知道有啥用

var app = express();

/* 
React 应用
// 在你应用 JavaScript 文件中包含了一个 script 标签
// 的 index.html 中处理任何一个 route
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
*/

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') { 
    res.send(200);
  } else {
    next();
  }
});

app.use(statistic.apiRecord)

const MongoStore = connectMongo(session);
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie,
  store: new MongoStore({
    url: config.url
  })
}))

// view engine setup (注册reder函数)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view
app.use('/', index);

// 自带的
app.use('/users', users);



// APIRouter
Router(app);


app.use(history());
// 相当于跟目录(后面的覆盖前面的?)
app.use(express.static('./public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
