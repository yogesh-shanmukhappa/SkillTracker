const CryptoJS = require("crypto-js");
exports.CryptoJS = CryptoJS;

const jwt = require('jsonwebtoken');
exports.jwt = jwt;

var myFunc1 = function() {
    express = require('express');
    mysql = require('mysql');
    multer = require('multer');
    bodyParser = require('body-parser');
    bcrypt = require('bcrypt');

    // local database viariable
    mysqlHost = '127.0.0.1';

    // knex environemt
    knex1 = require('knex')({
      client: 'mysql',
      connection: {
        host : mysqlHost,
        user : 'root',
        password : 'test@123',
        database : 'dev_hris',
        timezone: 'IST'
      },
      pool: { min: 0, max: 7 }
    });

    // knex environemt
    knexBackup = require('knex')({
      client: 'mysql',
      connection: {
        host : mysqlHost,
        user : 'root',
        password : 'test@123',
        database : 'dev_hris_backup',
      },
      pool: { min: 0, max: 7 }
    });

    // mysql environment
    con = mysql.createConnection({
        host : mysqlHost,
        user: "root",
        password: "test@123",
        multipleStatements: true,
        connectionLimit: 15,
        queueLimit: 50,
        acquireTimeout: 1000000
    });
};
exports.myFunc1 = myFunc1;

var verify = function(req, res, next) {

       const bearerHeader = 'Bearer ' + req.query.token;
       // Check if bearer is undefined
       if(typeof bearerHeader !== 'undefined') {
           // Split at the space
           const bearer = bearerHeader.split(' ');
           // Get token from array
           const bearerToken = bearer[1];
           // Set the token
           req.token = bearerToken;
           // Next middleware
           next();
       } else {
           // Forbidden
           res.sendStatus(403);
       }
}

exports.verify = verify;
var logUserActivity = function(authData, msg) {

}
exports.logUserActivity = logUserActivity;

var getDecryptData = function(body) {
  //Decrypt Message
  return JSON.parse(CryptoJS.AES.decrypt(body, 'testpwd').toString(CryptoJS.enc.Utf8));
}
exports.getDecryptData = getDecryptData;

var getEncryptData = function(data) {
  // Encrypt the whole body
  return CryptoJS.AES.encrypt(JSON.stringify(data), 'testpwd').toString();
  // return data;
}
exports.getEncryptData = getEncryptData;

var getEncryptSData = function(data) {
  // Encrypt the whole body
  return CryptoJS.AES.encrypt(JSON.stringify(data), 'testpwd').toString();
}
exports.getEncryptSData = getEncryptSData;

var getDecryptSData = function(data) {
  // Decrypt Message
  return JSON.parse(CryptoJS.AES.decrypt(data.toString(), 'testpwd').toString(CryptoJS.enc.Utf8));
}
exports.getDecryptSData = getDecryptSData;

// Handle the respose being sent to API request.
var sendResponse = function( req, res, dataArgs ) {

  res.set({
    'Cache-Control' : 'no-cache, no-store, must-revalidate',
    'Pragma' : 'no-cache',
    'Expires' : '0'
  });

  res.status( parseInt(dataArgs.status) ).send(
    [{
      data : getEncryptData( dataArgs.data )
    }]
  );
}
exports.sendResponse = sendResponse;
