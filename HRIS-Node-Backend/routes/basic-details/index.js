'use strict';

const basicDetails = require('express').Router();

var access = require('../../var.js');
access.myFunc1();

basicDetails.use(bodyParser.json());
basicDetails.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

basicDetails.get('/basicDetails', function (req, res) {

  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var dateFormat = year + '-' + month + '-' + day;

  var collectPreviousMonday = new Date()
  , day = collectPreviousMonday.getDay()
  , diffToMonday = collectPreviousMonday.getDate() - day + (day === 1 ? -6 : 1)
  , lastMonday = new Date(collectPreviousMonday.setDate(diffToMonday));
  var collectedLastMonday = lastMonday.getFullYear() + '-' + (lastMonday.getMonth() + 1) + '-' + lastMonday.getDate();

  var sql =
  `
  select Map_Language_Id, Map_Language_Name from dev_hris.map_language ORDER BY Map_Language_Name;
  select * from dev_hris.aa_departments ORDER BY Department_Name;
  select des.Designation_Id, des.Designation_Name, des.Designation_Code, dp.Department_Id, dp.Department_Name,des.Deleted_At, des.Deleted_By from dev_hris.map_designations des
  LEFT JOIN dev_hris.aa_departments dp on des.Department_Id = dp.Department_Id
  where des.Deleted_At IS  NULL AND des.Deleted_By IS NULL;
  SELECT * FROM dev_hris.map_city ORDER BY Map_City_Name;
  Select * From dev_hris.map_state ORDER BY Map_State_Name;
  Select * From dev_hris.map_country ORDER BY Map_Country_Name;

      `;
      con.query(sql, function(err, rows, fields) {
        if (!err){
          var response = [], dataObj = {};
          if (rows.length != 0) {
            dataObj['languages'] = rows[0];
            dataObj['departments'] = rows[1];
            dataObj['designations'] = rows[2];
            dataObj['cities'] = rows[3];
            dataObj['states'] = rows[4];
            dataObj['countries'] = rows[5];
            response.push({'result' : 'success', 'data' : dataObj});
          } else {
            response.push({'result' : 'error', 'msg' : 'No Results Found'});
          }
          res.setHeader('Content-Type', 'application/json');
          // res.status(200).send(response);
          access.sendResponse(req, res, {
            status: 200,
            data: response
          });
        } else {
          res.status(400).send(err);
        }
      });
    });

    module.exports = basicDetails;
