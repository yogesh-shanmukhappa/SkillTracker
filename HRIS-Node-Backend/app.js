'use strict';
// Bring in our dependencies
var app = require('express')();
var helmet = require('helmet');
var compression = require('compression');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream');
var cJSON = require('flatted');

var access = require('./var.js');

var basicDetails = require('./routes/basic-details');

access.myFunc1();
require('console-stamp')(console, '[yyyy-mm-dd HH:MM:ss.l]');

app.use(helmet());
app.use(compression());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware

    // Request modifications
    // Decrypt the data received from POST and PUT requests here.
    if ( req.method === 'POST' || req.method === 'PUT' ) {
       if ( req.headers && req.headers['content-type'] && req.headers['content-type'].indexOf('multipart/form-data') !== -1 ) {
        // Do anything you wanted for files.
          console.log("Expecting nothing to decrypt as request data is not encrypted.");
      } else {
        req.body = access.getDecryptData( req.body.data );

    }
  }
  next();
});

app.use(function (req, res, next) {
  if (
    req.url.indexOf( '/authenticate' ) !== -1
  ) {
    next();
  } else {
    var token = req.token || req.query.token;
    if ( !token ) {
      console.log( "No token for the url : " + req.url );
      res.sendStatus(403);
    } else {
      access.jwt.verify(token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          req.authData = authData;
          next();
        }
      });
    }
  }
});

// KRR: Global logging mechanism (morgan)
var customMorganLog = function (tokens, req, res) {

  var tokenStartIndex = -1, tokenEndIndex = -1, tokenString = "", reqBody = "", filteredURL = "", username = "<empty>", userrole = "<empty>";
  var fullUrl = tokens.url(req, res);

  tokenStartIndex = fullUrl.indexOf('token=');
  if ( tokenStartIndex !== -1 ) {
    tokenEndIndex = fullUrl.indexOf("&", tokenStartIndex + 6);
    if ( tokenEndIndex === -1 ) {
      tokenEndIndex = fullUrl.length;
    }
    tokenString = fullUrl.substring(tokenStartIndex, tokenEndIndex);
    filteredURL = fullUrl.replace(tokenString, '<token>');
  } else {
    filteredURL = fullUrl;
  }

  if( req.method === 'POST' || req.method === 'PUT'){
    reqBody = Object.assign({}, req.body);
    if(reqBody.password) reqBody.password = "*";
    if(reqBody.Current_Password) reqBody.Current_Password = "*";
    if(reqBody.New_Password) reqBody.New_Password = "*";
    if(reqBody.Confirm_New_Password) reqBody.Confirm_New_Password = "*";
    reqBody = cJSON.stringify(reqBody);
  }
  if( req.method === 'DELETE' ){
    reqBody = cJSON.stringify(req.params);
  }
  if( req.authData ) {
    username = req.authData.username;
    userrole = req.authData.userrole;
  } else {
    username = req.body.username;
    userrole = req.body.userrole;
  }

  return [
    new Date().toString(), //.replace(/ /g, '_'),
    tokens.method(req, res),
    username,
    userrole,
    filteredURL,
    reqBody,
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    tokens['response-time'](req, res), 'ms'
  ].join('\t');
};
var logDirectory = path.join(__dirname, 'morgan_log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});
app.use(
  morgan(
    customMorganLog,
    { stream: accessLogStream }
  )
);

//  Connect all our routes to our application
app.use('/', basicDetails);


/// Serve uploads folder with static path.
app.use('/static', express.static('uploads/images'));

/* Below block of code for starting API */
var options = {
  key: fs.readFileSync('cert/hris.key'),
  cert: fs.readFileSync('cert/hris.crt'),
  ca: [ fs.readFileSync('cert/gd1.crt'), fs.readFileSync('cert/gd2.crt'), fs.readFileSync('cert/gd3.crt') ]
};

let nowDateTime = new Date();
https.createServer(options, app).listen(3300, function() {
  console.log(`App listening with https on port 3100. Started at ${nowDateTime}`);
});

https.createServer(options, app).listen(3400, function() {
  console.log(`App listening with https on port 3200. Started at ${nowDateTime}`);
});
