/*
* Author : ABHINANDAN K TIWARI 
* 
*/

var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'abhi', //mysql database user name
  password : 'abhi', //mysql database password
  database : 'dev_hris_database' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});



/*
* Get master skills 
* @param type[all,primary,secondary]
* @return skillTracker Details
*/
app.get('/getSkillTypes', function (req, res) {
   if(req.body.type=='all'){
    connection.query('select * from skill_type', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
   }else{
  connection.query('select * from skill_type where `s_type`=?', [req.body.type], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
   }
});


/*
* Add SkillTracker Details 
* @param e_id
* @return skillTracker Details
*/
app.post('/addSkillTracker', function (req, res) {
  var params  = req.body;
  console.log(params);
  var len = params.length;
  for (var i=0; i< len; i++) {
    connection.query('INSERT INTO skill_tracker SET ?', params[i], function (error, results, fields) {
      if (error) throw error;
        res.end(JSON.stringify(results));
    });
  }
});

/*
* Get default skillsTracker details of the employee
*
* @param e_id
* @param s_type
*
* @return skillTracker Details
*/
app.post('/getDefaultSkillDetails', function (req, res) {
   var e_id=req.body.e_id;
   var s_type=req.body.s_type;
   var sql="SELECT A.id,A.e_id,A.evaluation_qtr,B.s_id,B.s_name,B.s_type,A.matrix_score,A.longivity_score,A.experience_score,A.skill_score,A.evaluated,DATE_FORMAT(A.evaluated_on,'%d-%m-%Y') as evaluated_on FROM `skill_tracker` A RIGHT OUTER JOIN skill_type B on A.s_id = B.s_id Where B.s_type = '"+s_type+"' and (A.id IS NULL or A.id in (Select Max(id) from skill_tracker Where e_id = '"+e_id+"' Group By s_id))";
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
});


/*
* Get skillsTracker history details of the employee
*
* @param e_id
* @param s_type
* @param evaluation_qtr
*
* @return skillTracker Details
*/
app.post('/getSkillDetailsHistory', function (req, res) {
   var e_id=req.body.e_id;
   var s_type=req.body.s_type;
   var e_qtr=req.body.evaluation_qtr;
   var sql="SELECT A.id,A.evaluation_qtr,A.e_id,B.s_id,B.s_name,B.s_type,A.matrix_score,A.longivity_score,A.experience_score,A.skill_score,A.evaluated,DATE_FORMAT(A.evaluated_on,'%d-%m-%Y') as evaluated_on,A.manager_e_id,C.Employee_Name as manager_name FROM `skill_tracker` A Left Join skill_type B on A.s_id = B.s_id left join employee C on A.manager_e_id = C.Employee_Id Where B.s_type = '"+s_type+"' and A.e_id = '"+e_id+"' and A.evaluation_qtr = '"+e_qtr+"'";
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
});


/*
* Get active Employee List 
* @param NA
* @return Employee List
*/
app.get('/getEmployeeList', function (req, res) {
   connection.query('SELECT Employee_Id,Employee_Name FROM employee WHERE Deleted IS NULL ', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


/*
* Approve Skill Details
* @param row id
* @return skillTracker Details
*/
app.post('/approveSkillTracker', function (req, res) {
   var params  = req.body;
   var len = params.length;
   for (var i=0; i< len; i++) {
      var rowid = params[i].id;
      var matrix = params[i].matrix_score;
      var longivity = params[i].longivity_score;
      var experience = params[i].experience_score;
      var skill = params[i].skill_score;
      var evaluated = params[i].evaluated;
      var manager = params[i].manager_e_id;

      var sql = "Update skill_tracker SET matrix_score = "+matrix+",longivity_score = "+longivity+", experience_score = "+longivity+", skill_score = "+skill+", evaluated = "+evaluated+", evaluated_on = now(), manager_e_id = '"+manager+"' WHERE id = "+rowid;
      connection.query(sql, function (error, results, fields) {
         if (error) throw error;
            res.end(JSON.stringify(results));
      });
   }
});