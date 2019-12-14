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
	user     : 'root', //mysql database user name
	password : '', //mysql database password
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
* Add SkillTracker Details 
* @param e_id
* @return skillTracker Details
*/
app.post('/addSkillTracker', function (req, res) {
	var params  = req.body;
	var len = params.length;
	for (var i=0; i< len; i++) {
		res.end(updateSkillTracker(params[i]));
	}
});

function updateSkillTracker(params){
	var evaluation_qtr = params.evaluation_qtr;
	var e_id = params.e_id;
	var s_id = params.s_id;
	var s_type = params.s_type;
	var matrix_score = params.matrix_score;
	var longivity_score = params.longivity_score;
	var experience_score = params.experience_score;
	var skill_score = params.skill_score;
	var insertparameter = params;
	var sql = "SELECT * from skill_tracker WHERE evaluation_qtr='"+evaluation_qtr+"' and e_id = '"+e_id+"' and s_id = "+s_id;
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		//console.log(results);
			if(results.length && results[0].id){
				if(matrix_score != results[0].matrix_score || longivity_score != results[0].longivity_score || experience_score != results[0].experience_score || skill_score != results[0].skill_score){
					var id = results[0].id;
					var sql1 = "INSERT INTO skill_tracker_history(evaluation_qtr, e_id, s_id, s_type, matrix_score, longivity_score, experience_score, skill_score, evaluated, evaluated_on, manager_e_id, created_ts, deleted_ts) SELECT evaluation_qtr, e_id, s_id, s_type, matrix_score, longivity_score, experience_score, skill_score, evaluated, evaluated_on, manager_e_id, created_ts, deleted_ts FROM skill_tracker WHERE id = "+id;
					connection.query(sql1,function (error1,result1,fileds1) {
							if (error) throw error;
					});
					var sql1 = "UPDATE skill_tracker set evaluation_qtr = '"+evaluation_qtr+"', e_id = '"+e_id+"', s_id = "+s_id+", s_type = '"+s_type+"', matrix_score = "+matrix_score+", longivity_score = "+longivity_score+", experience_score = "+experience_score+", skill_score = "+skill_score+", evaluated = 0  WHERE id = "+id;
					connection.query(sql1,function (error1,result1,fileds1) {
						if (error) throw error;
						return JSON.stringify(results);
					});
				}
			}
			else{
				connection.query('INSERT INTO skill_tracker SET ?', insertparameter, function (error, results, fields) {
					if (error) throw error;
					return JSON.stringify(results);
				});
			}
	});
}


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
	var isNew;
	var sql = "SELECT A.id,A.e_id,A.evaluation_qtr,B.s_id,B.s_name,B.s_type,IFNULL(A.matrix_score,0) as matrix_score, IFNULL(A.longivity_score,0) as longivity_score, IFNULL(A.experience_score,0) as experience_score, IFNULL(A.skill_score,0) as skill_score,A.evaluated,DATE_FORMAT(A.evaluated_on,'%d-%m-%Y') as evaluated_on FROM `skill_tracker` A RIGHT OUTER JOIN skill_type B on A.s_id = B.s_id and (A.id IS NULL or A.id in (Select Max(id) from skill_tracker Where e_id = '"+e_id+"' Group By s_id)) WHERE B.s_type = '"+s_type+"'";
	connection.query(sql, function (error, results, fields) {
		/*if(results[0].num > 0){
			sql="SELECT A.id,A.e_id,A.evaluation_qtr,B.s_id,B.s_name,B.s_type,IFNULL(A.matrix_score,0) as matrix_score, IFNULL(A.longivity_score,0) as longivity_score, IFNULL(A.experience_score,0) as experience_score, IFNULL(A.skill_score,0) as skill_score,A.evaluated,DATE_FORMAT(A.evaluated_on,'%d-%m-%Y') as evaluated_on FROM `skill_tracker` A RIGHT OUTER JOIN skill_type B on A.s_id = B.s_id Where B.s_type = '"+s_type+"' and (A.id IS NULL or A.id in (Select Max(id) from skill_tracker Where e_id = '"+e_id+"' Group By s_id))";
			console.log(111);
		}
		else{
			sql="SELECT NULL as id,'"+e_id+"' as e_id,NULL as evaluation_qtr,s_id,s_name,s_type,0 as matrix_score, 0 as longivity_score, 0 as experience_score, 0 as skill_score,0 as evaluated,0 as evaluated_on FROM `skill_type` WHERE s_type = '"+s_type+"'";
			console.log(222);
		}*/
		if (error) throw error;
		/*connection.query(sql, function (error, results, fields) {
			console.log(results);
			if (error) throw error;
			res.end(JSON.stringify(results));
		});*/
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
* @param Manager id
* @return Employee List
*/
app.post('/getApprovalEmployeeList', function (req, res) {
	var e_id = req.body.e_id;
	var sql = "SELECT Employee_Id,Employee_Name FROM employee WHERE Deleted IS NULL and Reporting_Manager ='"+e_id+"'";
	connection.query(sql, function (error, results, fields) {
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

		var sql1 = "INSERT INTO skill_tracker_history(evaluation_qtr, e_id, s_id, s_type, matrix_score, longivity_score, experience_score, skill_score, evaluated, evaluated_on, manager_e_id, created_ts, deleted_ts) SELECT evaluation_qtr, e_id, s_id, s_type, matrix_score, longivity_score, experience_score, skill_score, evaluated, evaluated_on, manager_e_id, created_ts, deleted_ts FROM skill_tracker WHERE id = "+rowid;
		connection.query(sql1,function (error1,result1,fileds1) {
			if (error1) throw error;
		});

		var sql = "Update skill_tracker SET matrix_score = "+matrix+",longivity_score = "+longivity+", experience_score = "+longivity+", skill_score = "+skill+", evaluated = "+evaluated+", evaluated_on = now(), manager_e_id = '"+manager+"' WHERE id = "+rowid;
		connection.query(sql, function (error, results, fields) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	}
});


/*
* Get Degination list departmentwise
* @param NA
* @return Designation
*/
app.get('/getDesignationList', function (req, res) {
	var sql = "SELECT B.Department_Name,A.Designation_Id, A.Designation_Name FROM map_designations A join `aa_departments` B on A.Department_Id = B.Department_id Where A.Deleted_At is NULL Order by B.Department_Name,A.Designation_Name";
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
});

/*
* Get Skill List
* @param Skill Type
* @return Skill List
*/
app.post('/getSkillsList', function (req, res) {
	var s_type = req.body.s_type;
	if(s_type != 'Upskill'){
		var sql = "SELECT s_id,s_name FROM skill_type WHERE deleted_ts IS NULL and s_type = '"+s_type+"'";
	}
	else{
		var sql = "SELECT s_id,s_name FROM skill_type WHERE deleted_ts IS NULL and s_type = 'Primary'";	
	}
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
});

/*
* Get Employee List
* @param Designation, Skills, Current Deployment
* @return Employee List
*/
app.post('/getReportEmployeeList', function (req, res) {
	var designation = req.body.designation;
	var skill = req.body.skill;
	var deployment = req.body.deployment;
	var filter = "";
	if(designation != 0){
		filter  = filter + " and B.Current_Designation in ("+designation+")";
	}
	if(skill != 0){
		filter = filter + " and C.s_id in ("+skill+")";
	}
	if(deployment != "0"){
		var str = "-1";
		for(let i=0;i<deployment.length;i++){
			str = str + ",'"+deployment[i]+"'";
		}
		filter = filter + " and D.Deployable in ("+str+")";
	}
	var sql = "SELECT Distinct(A.Employee_Id),A.Employee_Name FROM `employee` A JOin employee_company_history B on A.Employee_ID = B.Employee_Id join skill_tracker C on A.Employee_Id = C.e_id join aa_resources D on A.Employee_Id = D.Employee_Id WHERE A.Deleted is NULL and B.Company_History_End_date is NULL"+filter;
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
});

/*
* Get Report
* @param Reports Filetr
* @return report Table
*/
app.post('/getReport', function (req, res) {
	var type = req.body.type;
	var filter = "";
	if(type == 'Primary'){
		var qtr = req.body.qtr;
		var designation = req.body.designation;
		var skill = req.body.skill;
		var deployment =  req.body.deployment;
		var eid = req.body.eid;
		var evaluated =  req.body.evaluated;
		var matrix =  req.body.matrix;
		var longivity =  req.body.longivity;
		var experience = req.body.experience;
		var skillscore = req.body.skillscore;

		if(designation != 0){
			filter = filter + ' and B.Current_Designation in (' + designation+")";
		}
		if(skill != 0){
			filter = filter + ' and D.s_id in (' + skill + ")" ;
		}
		if(deployment != "0"){
			var str = "-1";
			for(let i=0;i<deployment.length;i++){
				str = str + ",'"+deployment[i]+"'";
			}
			filter = filter + " and G.Deployable in ("+str+")";
		}
		if(eid != 0){
			filter = filter + " and A.Employee_Id = '"+eid+"'";
		}
		if(evaluated != -1){
			filter = filter + " and D.evaluated in (" + evaluated+")";
		}
		if(matrix != 0){
			filter = filter + " and D.matrix_score = " + matrix;
		}
		if(longivity != 0){
			filter = filter + " and D.longivity_score = " + longivity;
		}
		if(experience != 0){
			filter = filter + " and D.experience_score = " + experience;
		}
		if(skillscore != 0){
			if(skillscore % 1 == 0){
				filter = filter + " and D.skill_score > " + (skillscore-1) + " and D.skill_score <=" + skillscore;
			}
			else{
				filter = filter + " and D.skill_score =" + skillscore;	
			}
		}

		var sql = "Select A.Employee_Id,A.Employee_Name,F.Employee_Name as reporting_manager,B.Current_Designation,C.Designation_Name,D.evaluation_qtr,D.s_id,E.s_name,D.matrix_score,D.longivity_score,D.experience_score,D.skill_score,D.evaluated from employee A join employee_company_history B on A.Employee_Id = B.Employee_Id join map_designations C on B.Current_Designation = C.Designation_Id join skill_tracker D on A.Employee_Id = D.e_id join skill_type E on D.s_id = E.s_id join employee F on A.Reporting_Manager = F.Employee_Id join aa_resources G on A.Employee_Id = G.Employee_Id Where A.Deleted is NULL and B.Company_History_End_date is NULL and D.evaluation_qtr = '"+qtr+"' and E.s_type = '"+type+"'"+filter;
	}
	else if(type == 'Upskill'){
		var qtr = req.body.qtr;
		var designation = req.body.designation;
		var skill = req.body.skill;
		var deployment =  req.body.deployment;
		var eid = req.body.eid;
		var evaluated =  req.body.evaluated;
		var project = req.body.project;
		var peoplemanager = req.body.peoplemanager;
		var matrix =  req.body.matrix;
		var longivity =  req.body.longivity;
		var experience = req.body.experience;
		var skillscore = req.body.skillscore;

		if(designation != 0){
			filter = filter + ' and B.Current_Designation in (' + designation+")";
		}
		if(skill != 0){
			filter = filter + ' and D.s_id in (' + skill + ")" ;
		}
		if(deployment != "0"){
			var str = "-1";
			for(let i=0;i<deployment.length;i++){
				str = str + ",'"+deployment[i]+"'";
			}
			filter = filter + " and G.Deployable in ("+str+")";
		}
		if(eid != 0){
			filter = filter + " and A.Employee_Id = '"+eid+"'";
		}
		if(evaluated != -1){
			filter = filter + " and D.evaluated in (" + evaluated+")";
		}
		if(project != 0){
		}
		if(peoplemanager != 0){
		}
		if(matrix != 0){
			filter = filter + " and D.matrix_score = " + matrix;
		}
		if(longivity != 0){
			filter = filter + " and D.longivity_score = " + longivity;
		}
		if(experience != 0){
			filter = filter + " and D.experience_score = " + experience;
		}
		if(skillscore != 0){
			if(skillscore % 1 == 0){
				filter = filter + " and D.skill_score > " + (skillscore-1) + " and D.skill_score <=" + skillscore;
			}
			else{
				filter = filter + " and D.skill_score =" + skillscore;	
			}
		}

		var sql = "Select A.Employee_Id,A.Employee_Name,F.Employee_Name as reporting_manager,B.Current_Designation,C.Designation_Name,D.evaluation_qtr,D.s_id,E.s_name,D.matrix_score,D.longivity_score,D.experience_score,D.skill_score,D.evaluated from employee A join employee_company_history B on A.Employee_Id = B.Employee_Id join map_designations C on B.Current_Designation = C.Designation_Id join skill_tracker D on A.Employee_Id = D.e_id join skill_type E on D.s_id = E.s_id join employee F on A.Reporting_Manager = F.Employee_Id join aa_resources G on A.Employee_Id = G.Employee_Id Where A.Deleted is NULL and B.Company_History_End_date is NULL and E.s_type = 'Primary'"+filter+" ORDER BY D.evaluation_qtr DESC, A.Employee_Id";
	}
	else if(type == 'Horizon3'){
		var qtr = req.body.qtr;
		var designation = req.body.designation;
		var skill = req.body.skill;
		var deployment =  req.body.deployment;

		if(designation != 0){
			filter = filter + ' and B.Current_Designation in (' + designation+")";
		}
		if(skill != 0){
			filter = filter + ' and D.s_id in (' + skill+")" ;
		}
		if(deployment != "0"){
			var str = "-1";
			for(let i=0;i<deployment.length;i++){
				str = str + ",'"+deployment[i]+"'";
			}
			filter = filter + " and G.Deployable in ("+str+")";
		}
			
		var sql = "Select A.Employee_Id,A.Employee_Name,F.Employee_Name as reporting_manager,B.Current_Designation,C.Designation_Name,D.evaluation_qtr,D.s_id,E.s_name,D.skill_score from employee A join employee_company_history B on A.Employee_Id = B.Employee_Id join map_designations C on B.Current_Designation = C.Designation_Id join skill_tracker D on A.Employee_Id = D.e_id join skill_type E on D.s_id = E.s_id join employee F on A.Reporting_Manager = F.Employee_Id join aa_resources G on A.Employee_Id = G.Employee_Id Where A.Deleted is NULL and B.Company_History_End_date is NULL and D.evaluation_qtr = '"+qtr+"' and  E.s_type = '"+type+"'"+filter;
	}

	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
});


/*
* Get Report
* @param Reports Filetr
* @return report Table
*/
app.post('/getChart', function (req, res) {
	var type = req.body.type;
	var filter = "";
	if(type == 'Primary'){
		var qtr = req.body.qtr;
		var designation = req.body.designation;
		var skill = req.body.skill;
		var deployment =  req.body.deployment;
		var eid = req.body.eid;
		var evaluated =  req.body.evaluated;
		var matrix =  req.body.matrix;
		var longivity =  req.body.longivity;
		var experience = req.body.experience;
		var skillscore = req.body.skillscore;
		var resourceChartResult = [];

		if(designation != 0){
			filter = filter + ' and B.Current_Designation in (' + designation+")";
		}
		if(skill != 0){
			filter = filter + ' and D.s_id in (' + skill + ")" ;
		}
		if(deployment != "0"){
			var str = "-1";
			for(let i=0;i<deployment.length;i++){
				str = str + ",'"+deployment[i]+"'";
			}
			filter = filter + " and G.Deployable in ("+str+")";
		}
		if(eid != 0){
			filter = filter + " and A.Employee_Id = '"+eid+"'";
		}
		if(evaluated != -1){
			filter = filter + " and D.evaluated in (" + evaluated+")";
		}
		if(matrix != 0){
			filter = filter + " and D.matrix_score = " + matrix;
		}
		if(longivity != 0){
			filter = filter + " and D.longivity_score = " + longivity;
		}
		if(experience != 0){
			filter = filter + " and D.experience_score = " + experience;
		}
		if(skillscore != 0){
			if(skillscore % 1 == 0){
				filter = filter + " and D.skill_score > " + (skillscore-1) + " and D.skill_score <=" + skillscore;
			}
			else{
				filter = filter + " and D.skill_score =" + skillscore;	
			}
		}

		//QUERY FOR TOTAL CHART
		var sql = "Select A.skill_score, COUNT(A.Employee_Id) as emp from (Select A.Employee_Id,ROUND(AVG(D.skill_score),1) as skill_score from employee A join employee_company_history B on A.Employee_Id = B.Employee_Id join map_designations C on B.Current_Designation = C.Designation_Id join skill_tracker D on A.Employee_Id = D.e_id join skill_type E on D.s_id = E.s_id join employee F on A.Reporting_Manager = F.Employee_Id join aa_resources G on A.Employee_Id = G.Employee_Id Where A.Deleted is NULL and B.Company_History_End_date is NULL and D.evaluation_qtr = '"+qtr+"' and E.s_type = '"+type+"'"+filter+" GROUP BY A.Employee_Id Order BY skill_score) A GROUP BY A.skill_score ORDER BY skill_score";

		//QUERY FOR MATRIX CHART
		var sql1 = "Select A.Designation_Name,A.matrix_score,count(A.Employee_Id) as emp from (Select A.Employee_Id,C.Designation_Name,ROUND(AVG(D.matrix_score),1) as matrix_score from employee A join employee_company_history B on A.Employee_Id = B.Employee_Id join map_designations C on B.Current_Designation = C.Designation_Id join skill_tracker D on A.Employee_Id = D.e_id join skill_type E on D.s_id = E.s_id join employee F on A.Reporting_Manager = F.Employee_Id join aa_resources G on A.Employee_Id = G.Employee_Id Where A.Deleted is NULL and B.Company_History_End_date is NULL and D.evaluation_qtr = '"+qtr+"' and E.s_type = '"+type+"'"+filter+" GROUP BY A.Employee_id Order BY matrix_score) A GROUP BY A.Designation_Name, A.matrix_score ORDER BY Designation_Name,matrix_score";

		//QUERY FOR LONGIVITY CHART
		var sql2 = "Select A.Designation_Name,A.longivity_score,count(A.Employee_Id) as emp from (Select A.Employee_Id,C.Designation_Name,ROUND(AVG(D.longivity_score),1) as longivity_score from employee A join employee_company_history B on A.Employee_Id = B.Employee_Id join map_designations C on B.Current_Designation = C.Designation_Id join skill_tracker D on A.Employee_Id = D.e_id join skill_type E on D.s_id = E.s_id join employee F on A.Reporting_Manager = F.Employee_Id join aa_resources G on A.Employee_Id = G.Employee_Id Where A.Deleted is NULL and B.Company_History_End_date is NULL and D.evaluation_qtr = '"+qtr+"' and E.s_type = '"+type+"'"+filter+" GROUP BY A.Employee_id Order BY longivity_score) A GROUP BY A.Designation_Name, A.longivity_score ORDER BY Designation_Name,longivity_score";

		//QUERY FOR EXPERIENCE CHART
		var sql3 = "Select A.Designation_Name,A.experience_score,count(A.Employee_Id) as emp from (Select A.Employee_Id,C.Designation_Name,ROUND(AVG(D.experience_score),1) as experience_score from employee A join employee_company_history B on A.Employee_Id = B.Employee_Id join map_designations C on B.Current_Designation = C.Designation_Id join skill_tracker D on A.Employee_Id = D.e_id join skill_type E on D.s_id = E.s_id join employee F on A.Reporting_Manager = F.Employee_Id join aa_resources G on A.Employee_Id = G.Employee_Id Where A.Deleted is NULL and B.Company_History_End_date is NULL and D.evaluation_qtr = '"+qtr+"' and E.s_type = '"+type+"'"+filter+" GROUP BY A.Employee_id Order BY experience_score) A GROUP BY A.Designation_Name, A.experience_score ORDER BY Designation_Name,experience_score";
		
		connection.query(sql, function (error, results, fields) {
			if (error) throw error;
			resourceChartResult.push(results);

			connection.query(sql1, function (error, results, fields) {
				if (error) throw error;
				resourceChartResult.push(results);
				
				connection.query(sql2, function (error, results, fields) {
					if (error) throw error;
					resourceChartResult.push(results);
					
					connection.query(sql3, function (error, results, fields) {
						if (error) throw error;
						resourceChartResult.push(results);
						res.end(JSON.stringify(resourceChartResult));
					});
				});
			});
		});
	}
	else if(type == 'Upskill'){
		var eid = req.body.eid;
		if(eid != 0){
			var qtr = req.body.qtr;
			var designation = req.body.designation;
			var skill = req.body.skill;
			var deployment =  req.body.deployment;
			var evaluated =  req.body.evaluated;
			var project = req.body.project;
			var peoplemanager = req.body.peoplemanager;
			var matrix =  req.body.matrix;
			var longivity =  req.body.longivity;
			var experience = req.body.experience;
			var skillscore = req.body.skillscore;
			var upskillChartResult = [];

			if(designation != 0){
				filter = filter + ' and B.Current_Designation in (' + designation+")";
			}
			if(skill != 0){
				filter = filter + ' and D.s_id in (' + skill + ")" ;
			}
			if(deployment != "0"){
				var str = "-1";
				for(let i=0;i<deployment.length;i++){
					str = str + ",'"+deployment[i]+"'";
				}
				filter = filter + " and G.Deployable in ("+str+")";
			}
			if(evaluated != -1){
				filter = filter + " and D.evaluated in (" + evaluated+")";
			}
			if(project != 0){
			}
			if(peoplemanager != 0){
			}
			if(matrix != 0){
				filter = filter + " and D.matrix_score = " + matrix;
			}
			if(longivity != 0){
				filter = filter + " and D.longivity_score = " + longivity;
			}
			if(experience != 0){
				filter = filter + " and D.experience_score = " + experience;
			}
			if(skillscore != 0){
				if(skillscore % 1 == 0){
					filter = filter + " and D.skill_score > " + (skillscore-1) + " and D.skill_score <=" + skillscore;
				}
				else{
					filter = filter + " and D.skill_score =" + skillscore;	
				}
			}

			//QUERY FOR SKILL TREND AVG CHART (FOR CHART 1 of UPSKILL)
			var sql = "Select D.evaluation_qtr,C.Designation_Name,D.s_id,E.s_name,ROUND(AVG(D.skill_score),1) as skill_score from employee A join employee_company_history B on A.Employee_Id = B.Employee_Id join map_designations C on B.Current_Designation = C.Designation_Id join skill_tracker D on A.Employee_Id = D.e_id join skill_type E on D.s_id = E.s_id join employee F on A.Reporting_Manager = F.Employee_Id join aa_resources G on A.Employee_Id = G.Employee_Id Where A.Deleted is NULL and B.Company_History_End_date is NULL and D.evaluation_qtr <= '"+qtr+"' and E.s_type = 'Primary'"+filter+" GROUP BY D.evaluation_qtr,C.Designation_Name,D.s_id Order BY C.Designation_Name,E.s_name";

			//QUERY FOR SKILL TREND INDIVIDUAL CHART (FOR CHART 1 of UPSKILL)
			var sql1 = "Select D.evaluation_qtr,C.Designation_Name,D.s_id,E.s_name,ROUND(AVG(D.skill_score),1) as skill_score from employee A join employee_company_history B on A.Employee_Id = B.Employee_Id join map_designations C on B.Current_Designation = C.Designation_Id join skill_tracker D on A.Employee_Id = D.e_id join skill_type E on D.s_id = E.s_id join employee F on A.Reporting_Manager = F.Employee_Id join aa_resources G on A.Employee_Id = G.Employee_Id Where A.Deleted is NULL and B.Company_History_End_date is NULL and D.evaluation_qtr <= '"+qtr+"' and E.s_type = 'Primary' and D.e_id = '"+eid+"'"+filter+" GROUP BY D.evaluation_qtr,C.Designation_Name,D.s_id Order BY C.Designation_Name,E.s_name";

			//QUERY FOR INDIVIDUAL CHART
			var sql2 = "Select A.evaluation_qtr, B.s_name,A.skill_score from skill_tracker A join skill_type B on A.s_id = B.s_id Where A.e_id = '"+eid+"' and B.s_type = 'Primary' and A.evaluation_qtr = '"+qtr+"'";

			connection.query(sql, function (error, results, fields) {
				if (error) throw error;
				upskillChartResult.push(results);

				connection.query(sql1, function (error, results, fields) {
					if (error) throw error;
					upskillChartResult.push(results);
					
					connection.query(sql2, function (error, results, fields) {
						if (error) throw error;
						upskillChartResult.push(results);
						res.end(JSON.stringify(upskillChartResult));
					});
				});
			});
		}
		else{
			res.end(JSON.stringify(0));
		}
	}
	else if(type == 'Horizon3'){
		var qtr = req.body.qtr;
		var designation = req.body.designation;
		var skill = req.body.skill;
		var deployment =  req.body.deployment;

		if(designation != 0){
			filter = filter + ' and B.Current_Designation in (' + designation+")";
		}
		if(skill != 0){
			filter = filter + ' and D.s_id in (' + skill+")" ;
		}
		if(deployment != "0"){
			var str = "-1";
			for(let i=0;i<deployment.length;i++){
				str = str + ",'"+deployment[i]+"'";
			}
			filter = filter + " and G.Deployable in ("+str+")";
		}
			
		var sql = "Select E.s_name,D.skill_score,COUNT(A.Employee_Id) as emp from employee A join employee_company_history B on A.Employee_Id = B.Employee_Id join map_designations C on B.Current_Designation = C.Designation_Id join skill_tracker D on A.Employee_Id = D.e_id join skill_type E on D.s_id = E.s_id join employee F on A.Reporting_Manager = F.Employee_Id join aa_resources G on A.Employee_Id = G.Employee_Id Where A.Deleted is NULL and B.Company_History_End_date is NULL and D.evaluation_qtr = '"+qtr+"' and  E.s_type = '"+type+"'"+filter+" GROUP BY E.s_name, D.skill_score ORDER BY E.s_name,D.skill_score";
		connection.query(sql, function (error, results, fields) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	}
});


/*
* Get Cron Jobs List
* @param NA
* @return Cron Jobs
*/
app.get('/getCronJobsList', function (req, res) {
	var sql = "SELECT id,cron_name,cron_description,DATE_FORMAT(last_run_date,'%d-%m-%Y') as last_run_date, DATE_FORMAT(next_run_date,'%d-%m-%Y') as next_run_date from cron_jobs";
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
	});
});

/*
* Get Cron Jobs List
* @param NA
* @return Cron Jobs
*/
app.post('/runCronNow', function (req, res) {
	var id = req.body.id;
	if(id == 1){
		autoInsertSkill(res);
	}
	else if(id == 2){
		autoApproveSkill(res);
	}
});

/*
* Auto Run Crom
* @param NA
* @return NA
*/
app.post('/autoRunCron', function (req,res) {
	var current_qtr = getCurrentQuarter();
	var insertBeforeDay=7;
	var approveBeforeDay=2;
	var insertCronDate;
	var approveCronDate;
	var temp;

	if(current_qtr.split(' ')[2]=='Q1'){
		temp=new Date(current_qtr.split(' ')[1], 6, 0).getDate();
		insertCronDate=new Date(current_qtr.split(' ')[1],5,(temp-insertBeforeDay)+1);
		approveCronDate=new Date(current_qtr.split(' ')[1],5,(temp-approveBeforeDay)+1);
	}else if(current_qtr.split(' ')[2]=='Q2'){
		temp=new Date(current_qtr.split(' ')[1], 9, 0).getDate();
		insertCronDate=new Date(current_qtr.split(' ')[1],8,(temp-insertBeforeDay)+1);
		approveCronDate=new Date(current_qtr.split(' ')[1],8,(temp-approveBeforeDay)+1);
	}else if(current_qtr.split(' ')[2]=='Q3'){
		temp=new Date(current_qtr.split(' ')[1], 12, 0).getDate();
		insertCronDate=new Date(current_qtr.split(' ')[1],11,(temp-insertBeforeDay)+1);
		approveCronDate=new Date(current_qtr.split(' ')[1],11,(temp-approveBeforeDay)+1);
	}else if(current_qtr.split(' ')[2]=='Q4'){	
		temp=new Date(current_qtr.split(' ')[1], 3, 0).getDate();
		insertCronDate=new Date(current_qtr.split(' ')[1],2,(temp-insertBeforeDay)+1);
		approveCronDate=new Date(current_qtr.split(' ')[1],2,(temp-approveBeforeDay)+1);
	}

	//var today = new Date();

	var today = new Date(2019,11,25);

	if(today.getTime() == insertCronDate.getTime()){
		console.log('Here now 1')
		autoInsertSkill(res);
	}

	if(today.getTime() == approveCronDate.getTime()){
		autoApproveSkill(res);
	}
	//res.end(JSON.stringify(1));

});

function autoInsertSkill(res){
	console.log('Here now 2');
	var current_qtr = getCurrentQuarter();
	var previous_qtr = getPreviousQuarter();
	var sql = "SELECT Employee_id from employee Where Deleted is NULL and Employee_id NOT IN (SELECT DISTINCT(e_id) from skill_tracker where evaluation_qtr = '"+current_qtr+"')";
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		for(var i=0;i<results.length;i++){
			var eid = results[i].Employee_id;
			var sql1 = "INSERT INTO skill_tracker ( evaluation_qtr, e_id, s_id, s_type, matrix_score, longivity_score, experience_score, skill_score, evaluated) SELECT '"+current_qtr+"', e_id, s_id, s_type, matrix_score, longivity_score, experience_score, skill_score, 0 from skill_tracker WHERE e_id = '"+eid+"' and evaluation_qtr = '"+previous_qtr+"'";
			connection.query(sql1, function (error1, results1, fields1) {
				if (error1) throw error1;
				res.end(JSON.stringify(1));
			});
		}
	});
	updateCronTable(1);	
	res.end(JSON.stringify(1));
}

function autoApproveSkill(res){
	var current_qtr = getCurrentQuarter();
	var sql = "SELECT Employee_id,Reporting_Manager from employee Where Deleted is NULL and Employee_id IN (SELECT DISTINCT(e_id) from skill_tracker where evaluation_qtr = '"+current_qtr+"' and evaluated = 0)";
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		for(var i=0;i<results.length;i++){
			var eid = results[i].Employee_id;
			var mid = results[i].Reporting_Manager
			var sql1 = "UPDATE skill_tracker SET evaluated = 1, manager_e_id = '"+mid+"' WHERE e_id = '"+eid+"' and evaluated = 0 and evaluation_qtr = '"+current_qtr+"'";
			connection.query(sql1, function (error1, results1, fields1) {
				if (error1) throw error1;
				res.end(JSON.stringify(1));
			});
		}
	});
	updateCronTable(2);	
	res.end(JSON.stringify(1));
}

function updateCronTable(id){
	var current_qtr = getNextQuarter();
	var day;
	if(id==1)
		day=7;
	else 
		day=2;
	var nextDate;
	var temp;
	if(current_qtr.split(' ')[2]=='Q1'){
		temp=new Date(current_qtr.split(' ')[1], 6, 0).getDate();
		nextDate=new Date(current_qtr.split(' ')[1],5,(temp-day)+1);
	}else if(current_qtr.split(' ')[2]=='Q2'){
		temp=new Date(current_qtr.split(' ')[1], 9, 0).getDate();
		nextDate=new Date(current_qtr.split(' ')[1],8,(temp-day)+1);
	}else if(current_qtr.split(' ')[2]=='Q3'){
		temp=new Date(current_qtr.split(' ')[1], 12, 0).getDate();
		nextDate=new Date(current_qtr.split(' ')[1],11,(temp-day)+1);
	}else if(current_qtr.split(' ')[2]=='Q4'){	
		temp=new Date(current_qtr.split(' ')[1], 3, 0).getDate();
		nextDate=new Date(current_qtr.split(' ')[1],2,(temp-day)+1);
	}

	var nextCronDate=nextDate.getFullYear()+'-'+nextDate.getMonth()+'-'+nextDate.getDate();

	var sql = "Update cron_jobs SET last_run_date = now(), last_run_status = 1, next_run_date='"+nextCronDate+"'  WHERE id = "+id;
	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
	});
}

function getCurrentQuarter() {
	var month = new Date().getMonth()+1;
	var year = new Date().getFullYear();
	
	month = month -3;//3 months is deducted from current month as fiscal qtr starts 3 months later than yearly qtr 
	if(month < 1){
		month = 12 + month;
	    year--;
	}

	return "FY "+year+' Q'+Math.ceil(month/3);
}

function getPreviousQuarter() {
	var month = new Date().getMonth()+1;
	var year = new Date().getFullYear();
	
	month = month -3;//3 months is deducted from current month as fiscal qtr starts 3 months later than yearly qtr 
	if(month < 1){
		month = 12 + month;
	    year--;
	}

	month = month - 3; //This is for getting previous qtr

	return "FY "+year+' Q'+Math.ceil(month/3);
}

function getNextQuarter() {
	var month = new Date().getMonth()+1;
	var year = new Date().getFullYear();
	
	month = month -3;//3 months is deducted from current month as fiscal qtr starts 3 months later than yearly qtr 
	if(month < 1){
		month = 12 + month;
	    year--;
	}

	month = month + 3; //This is for getting next qtr
	if(month > 12){
		month = month-12;
		year++;
	}
	return "FY "+year+' Q'+Math.ceil(month/3);
}