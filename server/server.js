//Config file
var APP_CONFIG = require('./app-config.js');

//Middleware
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Express = require('express');
var expressValidator = require('express-validator');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var session = require('express-session');

//Setup database
mongoose.connect(APP_CONFIG.dbLocation);
var db = mongoose.connection;

//Set routes
var auth_route = require('./routes/auth');
var api_route = require('./routes/api');


//Init app
const app = new Express();

// EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Set the static folder
app.use(Express.static(path.join(__dirname, 'static')));

//Express Session
app.use(session({
  secret: 'supersecret',
  saveUninitialized: true,
  resave: true
}))

//Express Validator Middleware
//A validator can detect validity of strings such as valid emails, passwords with certain restrictions, etc...
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// Passport config
app.use(passport.initialize());
app.use(passport.session());


// Universal routing and rendering
app.get('*', function(req, res){
  let markup = '';
  let status = 200;

  return res.status(status).render('index', { markup });
});

app.post('/testpost', function(req,res){
  res.status(200).json({
    message: 'test response.'
  })
});

//Set routes
app.use('/auth', auth_route);
app.use('/api', api_route);


// Start server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});