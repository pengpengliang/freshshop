var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs')
var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/good');
var lists = require('./routes/list');
var wines = require('./routes/wine');
var leisures = require('./routes/leisure');
var milks = require('./routes/milk');
var livingrooms = require('./routes/livingroom');
var kitchenwares = require('./routes/kitchenware');
var bedrooms = require('./routes/bedroom');
var sappliances = require('./routes/sappliance');
var bappliances = require('./routes/bappliance');
var mobiles = require('./routes/mobile');
var lives = require('./routes/live');
var homes = require('./routes/home');
var admins = require('./routes/admin');







var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express)

app.set('view engine', 'html');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    if (req.cookies.userId) {
        next();
    } else if (req.cookies.adminId) {
        next();
    } else {
        if (req.originalUrl == '/users/login' || req.originalUrl == '/admins/login' || req.originalUrl == '/admins/logout' || req.originalUrl == '/users/logout' || req.originalUrl == '/users/reg' || req.originalUrl == '/users/checkLogin' || req.path == '/wines' || req.path == '/goods' || req.path == '/leisures' || req.path == '/milks' || req.path == '/sappliances' || req.path == '/bappliances' || req.path == '/mobiles' || req.path == '/kitchenwares' || req.path == '/bedrooms' || req.path == '/livingrooms') {
            next();
        } else {
            res.json({
                status: '10001',
                msg: '当前未登录',
                result: ''
            });
        }
    }

});

app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);
app.use('/lists', lists);
app.use('/wines', wines);
app.use('/leisures', leisures);
app.use('/milks', milks);
app.use('/livingrooms', livingrooms);
app.use('/kitchenwares', kitchenwares);
app.use('/bedrooms', bedrooms);
app.use('/sappliances', sappliances);
app.use('/bappliances', bappliances);
app.use('/mobiles', mobiles);
app.use('/lives', lives);
app.use('/homes', homes);
app.use('/admins', admins);


// app.use(function(req, res, next) {
//     if (req.cookies.userId) {
//         next();
//     } else {
//         if (req.originalUrl == '/users/login' || req.originalUrl == '/users/logout') {
//             next();
//         } else {
//             res.json({
//                 status: '10001',
//                 msg: '当前未登录',
//                 result: ''
//             });
//         }
//     }

// });

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