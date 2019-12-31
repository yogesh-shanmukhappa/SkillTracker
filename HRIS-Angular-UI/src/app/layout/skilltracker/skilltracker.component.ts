import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, ResponseContentType } from '@angular/http';
import { Globals } from '../../shared';
import {FormGroup, FormControl, Validators}  from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SkilltrackerService } from '../../provider/skilltracker/skilltracker.service';
//import * as Highcharts from 'highcharts';


@Component({
	selector: 'app-skilltracker',
	templateUrl: './skilltracker.component.html',
	styleUrls: ['./skilltracker.component.scss'],
	animations: [routerTransition()]
})
export class SkilltrackerComponent implements OnInit {
	public quarter:Array<any> = [];
	public alerts: Array<any> = [];
	public sliders: Array<any> = [];
	public evaluationQrtr: string[];

	//Config Variables
	employeeID = 'EMP0001';
	role = 4;
	gracePeriod = 30;

	skillDetails: Array<any> = [];
	skillDetailsOriginal: Array<any> = [];
	secondarySkillList:Array<any>=[];
	horizonSkillDetails:Array<any> = [];
	horizonSkillDetailsOriginal: Array<any> = [];
	display='none';

	//Below variables are used to populate the values in respective score dropdowns
	matrixScoreOption:Array<any> = [];
	recencyScoreOption:Array<any> = [];
	experienceScoreOption:Array<any> = [];
	horizonSkillScoreOption:Array<any> = [];
	evaluationStatusOption:Array<any> = [];

	//Below variables are used to set current Qtr and check if selected Qtr is current or not
	currentQtr:any;
	isCurrentQtr: boolean = true;

	//Below Variable are used in Approval Tab functions
	approvalQtr:string;
	approvalEmployeeId:string;
	isApprovalCurrentQtr:boolean = true;
	employeeList:Array<any> = [];
	approvalSkillDetails: Array<any> = [];
	approvalSkillOriginal:Array<any> = [];
	approvalHorizon3SkillDetails : Array<any> = [];

	//Below are the variables used for reporting
	reportOption = 'Primary';
	reportQtr:string;
	reportDesignation=0;
	reportSkill=0;
	reportDeployment = "0";
	reportEmployeeId = 0;
	reportEvaluated = -1;
	reportProject = 0;
	reportPeopleManager = 0;
	reportSkillScore = 0;
	reportButtonDisable:boolean = true;
	designationList:Array<any> = [];
	skillList:Array<any> = [];
	reportEmployeeList:Array<any> = [];
	reportTable:Array<any> = [];


	//reportMatrixScore = 0;
	//reportRecencyScore = 0;
	//reportExperienceScore = 0;
	
	resourceTotalChart: Object;
	resourceMatrixChart: Object;
	resourceRecencyChart: Object;
	resourceExperienceChart: Object;
	upskillTrendChart: Object;
	upskillIndividualChart: Object;
	horizon3ScoreChart:Object;

	//Below are the variables used for setting
	buttondisabled:boolean = false;
	currentDate = new Date();
	presentDate = this.currentDate.getDate()+"-"+(+this.currentDate.getMonth()+1)+"-"+this.currentDate.getFullYear();
	lastUpdatedDate = '';
	lastUpdatedBy = '';
	matrixScoreWeight = 0;
	recencyScoreWeight = 0;
	experienceScoreWeight = 0;
	
	
	constructor(private http: Http, private globals : Globals, private STService : SkilltrackerService) {
		this.prepareSkillTrackerTab();
		
		this.resourceTotalChart = {
      		chart: {
      			caption: 'Total',
      			xAxisName: 'Skill Score',
      			yAxisName: 'No. of Employees',
      			theme: 'fusion',
      			plotToolText: "Skill Score: $label <br> No. of Employees: $dataValue"
      		},
      		data: []
    	};

		this.resourceMatrixChart = {
			chart: {
				caption: 'Matrix Score', 
				xAxisName: 'Matrix Score', 
				yAxisName: 'No. of Employees',
				theme: 'fusion',
				plotToolText: "Matrix Score: $label <br> No. of Employees: $dataValue <br> Designation: $seriesName"
			},
			categories: [{
				category: [{label: "0"},{label: "1"},{label: "2"},{label: "3"},{label: "4"}]
    		}],
  			dataset: []
		};

		this.resourceRecencyChart = {
			chart: {
				caption: 'Recency Score', 
				xAxisName: 'Recency Score', 
				yAxisName: 'No. of Employees',
				theme: 'fusion',
				plotToolText: "Recency Score: $label <br> No. of Employees: $dataValue <br> Designation: $seriesName"
			},
			categories: [{
				category: [{label: "0"},{label: "1"},{label: "2"},{label: "3"},{label: "4"}]
    		}],
  			dataset: []
		};

		this.resourceExperienceChart = {
			chart: {
				caption: 'Experience Score', 
				xAxisName: 'Experience Score', 
				yAxisName: 'No. of Employees', 
				theme: 'fusion',
				plotToolText: "Experience Score: $label <br> No. of Employees: $dataValue <br> Designation: $seriesName"
			},
			categories: [{
				category: [{label: "0"},{label: "1"},{label: "2"},{label: "3"},{label: "4"}]
    		}],
  			dataset: []
		};

		this.upskillTrendChart = {
			chart: {
				caption: 'Quarterly Skill Score Trend', 
				xAxisName: 'Quarters', 
				yAxisName: 'Skill Score', 
				theme: 'fusion',
				plotToolText: "Quarter: $label <br> Skill Score: $dataValue <br> Legend: $seriesName"
			},
			categories: [{
				category: []
    		}],
  			dataset: []
		};

		this.upskillIndividualChart = {
      		chart: {
      			caption: 'Current Individual Skill Score',
      			xAxisName: 'Skills',
      			yAxisName: 'Skill Score',
      			theme: 'fusion',
      			plotToolText: "Skill: $label <br> Skill Score: $dataValue"
      		},
      		data: []
    	};

		this.horizon3ScoreChart = {
			chart: {
				caption: 'Horizon3 Score Chart', 
				xAxisName: 'Skills', 
				yAxisName: 'No. of Employees', 
				theme: 'fusion',
				plotToolText: "Skill: $label <br> No. of Employees: $dataValue <br> Score: $seriesName"
			},
			categories: [{
				category: []
    		}],
  			dataset: [
  				{seriesname: "Begineer", data: []},
    			{seriesname: "Intermediate", data: []},
    			{seriesname: "Advanced", data: []}
 			]
		};

	}

	ngOnInit() {
		this.evaluationQrtr = this.getEvaluationQuarter();
		

		//For Priamry Skills 
		this.matrixScoreOption = [{'id':0,'name':'N/A'},{'id':1,'name':'Basic'},{'id':2,'name':'Intermediate1'},{'id':3,'name':'Intermediate2'},{'id':4,'name':'Expert'} ];
		this.recencyScoreOption = [{'id':0,'name':'N/A'},{id:1, name:"More Than 18 Months"},{id:2, name:"8 to 18 Months"},{id:3, name:"4 to 7 Months"},{id:4, name:"0 1o 3 Months"}];
		this.experienceScoreOption = [{'id':0,'name':'N/A'},{id:1, name:"0 to 3 Months"},{id:2, name:"4 to 7 Months"},{id:3, name:"8 to 15 Months"},{id:4, name:"More Than 18 Months"}];

		//FOr Horizon3 Skills
		this.horizonSkillScoreOption = [{id:1, name:'Beginner'},{id:2, name:'Intermediate'},{id:3, name:'Advanced'}];  
	}

	prepareSkillTrackerTab(){
		this.getScoreWeight();
		this.loadCurrentSkills();
	}

	employeeChange(){
		this.loadCurrentSkills();
	}

	//For Populating Evaluation Quarter List
	getEvaluationQuarter() {

		var toDate = new Date();
		toDate.setTime(toDate.getTime() -  (this.gracePeriod * 24 * 60 * 60 * 1000));
		var month;
		var year;
		month = toDate.getMonth()+1;
		year = toDate.getFullYear();


		month = month -3;//3 months is deducted from current month as fiscal qtr starts 3 months later than yearly qtr 
		if(month < 1){
			month = 12 + month;
		    year--;
		}

		this.currentQtr = "FY "+year+' Q'+Math.ceil(month/3);
		this.quarter.push("FY "+year+' Q'+Math.ceil(month/3));
		for(var i=1;i<=7;i++){
			month = month-3;
			if(month<1){
				month = 12+month;
				year--;
			}
			this.quarter.push("FY "+year+' Q'+Math.ceil(month/3));
		}
		return this.quarter;
	}

	//For Creating Default/Current Qtr tables of Primary & Horizon3 Skills 
	loadCurrentSkills(){
		this.skillDetails = [];
		this.secondarySkillList = [];
		this.horizonSkillDetails = [];
		this.skillDetailsOriginal = [];
		this.horizonSkillDetailsOriginal = [];

		//PRIMARY SKILL DETAILS
		let _jsonDtPrime = {"e_id": this.employeeID,"s_type":"Primary"}
		let param = JSON.stringify(_jsonDtPrime);
		this.STService.getLatestSkillDetails(param).subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					if(data[i].evaluation_qtr != this.currentQtr){
						data[i].evaluated = 2;
						data[i].evaluated_on = "";
						data[i].manager_name = "";
					}
					this.skillDetails.push(data[i]);
				}
				this.skillDetailsOriginal = JSON.parse(JSON.stringify(this.skillDetails));
			}
		}, err => {
			console.log(err);
		})

		//HORIZON3 SKILL DETAILS
		let _jsonDtHorizon3 = {"e_id": this.employeeID,"s_type":"Horizon3"}
		param = JSON.stringify(_jsonDtHorizon3);
		this.STService.getLatestSkillDetails(param).subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					let obj = {
						'id':data[i].s_id,
						'name':data[i].s_name
					};
					this.secondarySkillList.push(obj);

					if(data[i].evaluation_qtr != this.currentQtr){
						data[i].evaluated = 2;
						data[i].evaluated_on = "";
						data[i].manager_name = "";
					}

					if(data[i].id){
						this.horizonSkillDetails.push(data[i]);
					}
				}
				this.horizonSkillDetailsOriginal = JSON.parse(JSON.stringify(this.horizonSkillDetails));
			}
		}, err => {
			console.log(err);
		})
	}

	//For Creating History Qtr tables of Primary & Horizon3 Skills 
	loadHistorySkills(selectedQtr){
		this.skillDetails = [];
		this.horizonSkillDetails = [];

		let _jsonDtPrime = {"e_id": this.employeeID,"s_type":"Primary","evaluation_qtr":selectedQtr}
		let _jsonDtHorizon3 = {"e_id": this.employeeID,"s_type":"Horizon3","evaluation_qtr":selectedQtr}

		//PRIMARY SKILL DETAILS
		let param = JSON.stringify(_jsonDtPrime);
		this.STService.getHistorySkillDetails(param).subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					this.skillDetails.push(data[i]);
				}
			}
		}, err => {
			console.log(err);
		})
		//HORIZON3 SKILL DETAILS
		param = JSON.stringify(_jsonDtHorizon3);
		this.STService.getHistorySkillDetails(param).subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					this.horizonSkillDetails.push(data[i]);
				}
			}
		}, err => {
			console.log(err);
		})
	}

	//For Displaying History Data
	onQuarterChange(selectedQtr){
		if(this.currentQtr != selectedQtr){
			this.isCurrentQtr = false;
			this.loadHistorySkills(selectedQtr);
		} 
		else{
			this.isCurrentQtr = true;
			this.loadCurrentSkills();
		}
	}

	//For Calculating Skill Score of Primary Skills on Matrix, Logivity & Experience score change
	calculateSkillScore(_inx) {
		var sumnum = (+this.skillDetails[_inx].matrix_score*this.matrixScoreWeight) + (+this.skillDetails[_inx].recency_score*this.recencyScoreWeight) + (+this.skillDetails[_inx].experience_score*this.experienceScoreWeight);
		this.skillDetails[_inx].skill_score = sumnum;
	}    

	//For Inserting Primary and Horizon3 skills in the table
	onSubmit(skillIndex) {
		if(skillIndex == 1 || skillIndex == '1'){
			var jsonData = [];
			let passDetails:string;
			for(var i=0;i<this.skillDetails.length;i++){
				if(+this.skillDetails[i].skill_score > 0){
					var obj = {
						"evaluation_qtr":this.currentQtr,
						"e_id" : this.employeeID,
						"s_id" : this.skillDetails[i].s_id,
						"s_type": "Primary",
						"matrix_score" : this.skillDetails[i].matrix_score,
						"recency_score" : this.skillDetails[i].recency_score,
						"experience_score" : this.skillDetails[i].experience_score,
						"evaluated" : "0",
						"manager_e_id" : 0,
						"skill_score" : this.skillDetails[i].skill_score
					};
					jsonData.push(obj);
					passDetails = JSON.stringify(jsonData);
				}
			}
			this.STService.saveSkillInformation(passDetails).subscribe(data=>{
				let res:any = data;
				if(res){  
				  alert("success")
				}else{
				  alert("error")
				}
			});
		}
		if(skillIndex == 2 || skillIndex == '2'){
			var jsonData = [];
			let passDetails:string;
			for(var i=0;i<this.horizonSkillDetails.length;i++){
				if(JSON.stringify(this.horizonSkillDetails[i]) != JSON.stringify(this.horizonSkillDetailsOriginal[i]) || this.horizonSkillDetails[i].evaluated != 1){
					var obj_s = {
						"evaluation_qtr":this.currentQtr,
						"e_id" : this.employeeID,
						"s_id" : this.horizonSkillDetails[i].s_id,
						"s_type": "Horizon3",
						"matrix_score" : 0,
						"recency_score" : 0,
						"experience_score" : 0,
						"evaluated" : "0",
						"manager_e_id" : 0,
						"skill_score" : this.horizonSkillDetails[i].skill_score
					};
					jsonData.push(obj_s);
					passDetails = JSON.stringify(jsonData);
				}
			}
			this.STService.saveSkillInformation(passDetails).subscribe(data=>{
				let res:any = data;
				if(res){  
				  alert("success")
				}else{
				  alert("error")
				}
			});
		}
	}

	//For adding Horizon3 Skills new row
	addHorizonSkillRow(){
		let len = this.horizonSkillDetails.length;
		let skilllen = this.secondarySkillList.length;
		if(len <skilllen){
			let obj = JSON.parse(JSON.stringify(this.horizonSkillDetails[len-1]));
			obj.id = "";
			obj.s_id = 0;
			obj.s_name = "";
			obj.skill_score = 0;
			obj.evaluated = 2;
			obj.evaluated_on = "";
			obj.manager_name = "";
			this.horizonSkillDetails.push(obj);
		}
		else{
			alert('Maximum no. of rows reached.')
		}
	}
	
	
	 
	/*** Approval section: tab2 ***/
	prepareApprovalTab(){
		this.getApprovalEmployeeList();
		this.approvalQtr = this.currentQtr;
		if(this.approvalSkillDetails.length >0){
			this.approvalEmployeeId = this.approvalSkillDetails[0].e_id;   
		}
		else{
			this.approvalEmployeeId = "0";
		}
		this.evaluationStatusOption = [{id:0, name:'Pending'},{id:1, name:'Approved'},{id:-1, name:'Decline'}];
	}
	
	//For Showing Categorized Employees list based on Reporting Employees and Other Employees
	getApprovalEmployeeList(){
		this.employeeList = [];
		let emp = {"e_id":this.employeeID};
		let param = JSON.stringify(emp);
		var catname = "";
		var employees:Array<any> = [];
		this.STService.getApprovalEmployeeList(param).subscribe((data : any[])=>{
			if(data.length > 0){
				//this.role = 1;
				for(let i=0;i<data.length;i++){
					if(catname != data[i].Category ){
						if(catname != ''){
							var obj = {
								"category":catname,
								"employees":employees
							};
							this.employeeList.push(obj);
							catname = '';
							employees = [];
						}
						catname = data[i].Category;
										 
					}
					employees.push({
						"id":data[i].Employee_Id,
						"name":data[i].Employee_Name
					});
				}
				var obj = {
					"category":catname,
					"employees":employees
				};
				this.employeeList.push(obj);
			}
		}, err => {
			console.log(err);
		})
	}

	getApprovalData(){
		this.approvalSkillDetails = [];
		this.approvalSkillOriginal = [];
		this.approvalHorizon3SkillDetails = [];

		if(this.currentQtr != this.approvalQtr){
			this.isApprovalCurrentQtr = false;
		}
		else{
			this.isApprovalCurrentQtr = true;
		}

		let _jsonDtPrime = {"e_id": this.approvalEmployeeId,"s_type":"Primary","evaluation_qtr":this.approvalQtr}
		let _jsonDtHorizon3 = {"e_id": this.approvalEmployeeId,"s_type":"Horizon3","evaluation_qtr":this.approvalQtr}

		//PRIMARY SKILL DETAILS
		let param = JSON.stringify(_jsonDtPrime);
		this.STService.getHistorySkillDetails(param).subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					this.approvalSkillDetails.push(data[i]);
					
				}
				this.approvalSkillOriginal = JSON.parse(JSON.stringify(this.approvalSkillDetails));
			}
		}, err => {
			console.log(err);
		})
		//HORIZON3 SKILL DETAILS
		param = JSON.stringify(_jsonDtHorizon3);
		this.STService.getHistorySkillDetails(param).subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					this.approvalHorizon3SkillDetails.push(data[i]);
				}
			}
		}, err => {
			console.log(err);
		})
	}

	//For Calculating Approval Skill Score of Primary Skills on Matrix, Logivity & Experience score change
	/*calculateApprovalSkillScore(_inx) {
		var sumnum = (+this.approvalSkillDetails[_inx].matrix_score*this.matrixScoreWeight) + (+this.approvalSkillDetails[_inx].recency_score*this.recencyScoreWeight) + (+this.approvalSkillDetails[_inx].experience_score*this.experienceScoreWeight);
		this.approvalSkillDetails[_inx].skill_score = sumnum;
	}*/

	//For Updating Approval Records in the table
	saveApprovalData(skillIndex) {
		if(skillIndex == 1 || skillIndex == '1'){
			var jsonData = [];
			let passDetails:string;
			for(var i=0;i<this.approvalSkillDetails.length;i++){
				if(JSON.stringify(this.approvalSkillDetails[i]) != JSON.stringify(this.approvalSkillOriginal[i])){
					var obj = {
						"id":this.approvalSkillDetails[i].id,
						"evaluation_qtr":this.approvalQtr,
						"e_id" : this.approvalEmployeeId,
						"s_id" : this.approvalSkillDetails[i].s_id,
						"s_type": "Primary",
						//"matrix_score" : this.approvalSkillDetails[i].matrix_score,
						//"recency_score" : this.approvalSkillDetails[i].recency_score,
						//"experience_score" : this.approvalSkillDetails[i].experience_score,
						//"skill_score" : this.approvalSkillDetails[i].skill_score,
						"evaluated" : this.approvalSkillDetails[i].evaluated,
						"manager_e_id" : this.employeeID
						
					};
					jsonData.push(obj);
					passDetails = JSON.stringify(jsonData);
				}
			}
			this.STService.saveApprovalData(passDetails).subscribe(data=>{
				let res:any = data;
				if(res){  
				  alert("success")
				}else{
				  alert("error")
				}
			});
		}
		if(skillIndex == 2 || skillIndex == '2'){
			var jsonData = [];
			let passDetails:string;
			for(var i=0;i<this.approvalHorizon3SkillDetails.length;i++){
				if(+this.approvalHorizon3SkillDetails[i].evaluated != 0){
					var obj_s = {
						"id":this.approvalHorizon3SkillDetails[i].id,
						"evaluation_qtr":this.approvalQtr,
						"e_id" : this.approvalEmployeeId,
						"s_id" : this.approvalHorizon3SkillDetails[i].s_id,
						"s_type": "Horizon3",
						"matrix_score" : 0,
						"recency_score" : 0,
						"experience_score" : 0,
						"skill_score" : this.approvalHorizon3SkillDetails[i].skill_score,
						"evaluated" : this.approvalHorizon3SkillDetails[i].evaluated,
						"manager_e_id" : this.employeeID
					};
					jsonData.push(obj_s);
					passDetails = JSON.stringify(jsonData);
				}
			}
			this.STService.saveApprovalData(passDetails).subscribe(data=>{
				let res:any = data;
				if(res){  
				  alert("success")
				}else{
				  alert("error")
				}
				this.getApprovalData();
			});
		}
		
	}

	/*** Report section: tab3 ***/
	preparePrimaryReportTab(){
		this.reportOption = 'Primary';
		this.reportQtr = this.currentQtr;
		this.reportDesignation = 0;
		this.reportSkill = 0;
		this.reportDeployment = "0";
		this.reportEmployeeId = 0;
		this.reportEvaluated = -1;
		//this.reportMatrixScore = 0;
		//this.reportRecencyScore = 0;
		//this.reportExperienceScore = 0;
		this.reportSkillScore =0;
		this.getDesignation();
		this.getSkills('Primary');
		this.getReportEmployeeList();
		this.getReport('Primary');
	}

	/*** UPSKILL REPORTS ***/
	prepareUpskillReportTab(){
		this.reportOption = 'Upskill';
		this.reportSkill = 0;
		this.reportDesignation = 0;
		this.reportDeployment = "0";
		this.reportEmployeeId = 0;
		this.reportEvaluated = -1;
		this.reportProject = 0;
		this.reportPeopleManager = 0;
		//this.reportMatrixScore = 0;
		//this.reportRecencyScore = 0;
		//this.reportExperienceScore = 0;
		this.reportSkillScore =0;
		this.getDesignation();
		this.getSkills('Upskill');
		this.getReportEmployeeList();
		this.getReport('Upskill');
	}

	/*** HORIZON 3 REPORTS ***/
	prepareHorizon3ReportTab(){
		this.reportOption = 'Horizon3';
		this.reportQtr = this.currentQtr;
		this.reportDesignation = 0;
		this.reportSkill = 0;
		this.reportDeployment = "0";
		this.getDesignation();
		this.getSkills('Horizon3');
		this.getReport('Horizon3');
	}

	//If Designation Filter is Changed
	changedDesignation(){
		this.getReportEmployeeList();
	}

	//If Skill Filter is Changed
	changedSkill(){
		if(this.reportOption == 'Upskill'){
			if(this.reportSkill == 0 || this.reportEmployeeId == 0){
			this.reportButtonDisable = true; 
		}
		else{
			this.reportButtonDisable = false;
		}
		}
		else{
			if(this.reportSkill == 0){
				this.reportButtonDisable = true; 
			}
			else{
				this.reportButtonDisable = false;
			}
		}
		
		this.getReportEmployeeList();
	}

	//If Current Deployement Filter is Changed
	changedDeployment(){
		this.getReportEmployeeList();
	}

	//If Employee ID is Changed
	changedEmployee(){
		if(this.reportEmployeeId == 0){
			this.reportButtonDisable = true; 
		}
		else{
			this.reportButtonDisable = false;
		}
	}

	//For Optgroup Designation for Report Filter
	getDesignation(){
		this.designationList = [];
		var deptname = "";
		var designation:Array<any> = [];
		this.STService.getDesignation().subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					if(deptname != data[i].Department_Name ){
						if(deptname != ''){
							var obj = {
								"department":deptname,
								"designation":designation
							};
							this.designationList.push(obj);
							deptname = '';
							designation = [];
						}
						deptname = data[i].Department_Name;
										 
					}
					designation.push({
						"id":data[i].Designation_Id,
						"name":data[i].Designation_Name
					});
				}
				var obj = {
					"department":deptname,
					"designation":designation
				};
				this.designationList.push(obj);
			}
		}, err => {
			console.log(err);
		})
	}

	//For Listing Skills for Report Filter
	getSkills(stype){
		this.skillList = [];
		let type = {"s_type":stype};
		let param = JSON.stringify(type);
		this.STService.getSkillsList(param).subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					var obj = {
					"id":data[i].s_id,
					"name":data[i].s_name
					};
					this.skillList.push(obj);
				}
			}
		}, err => {
			console.log(err);
		})
	}

	//For Listing Employee for Report Filter
	getReportEmployeeList(){
		this.reportEmployeeList = [];
		let desgination = this.reportDesignation;
		let skill = this.reportSkill;
		let deployment = this.reportDeployment;
		let data = {"designation":desgination,"skill":skill,"deployment":deployment};
		let param = JSON.stringify(data);
		this.STService.getReportEmployeeList(param).subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					this.reportEmployeeList.push(data[i]);
				}
			}
		}, err => {
			console.log(err);
		})
	}

	//For Generating Report
	getReport(stype){
		this.reportTable = [];
		let data = {};
		if(stype == 'Primary'){
			
			data = {
				'type': 'Primary',
				'qtr': this.reportQtr,
				'designation': this.reportDesignation,
				'skill': this.reportSkill,
				'deployment': this.reportDeployment,
				'eid': this.reportEmployeeId,
				'evaluated': this.reportEvaluated,
				//'matrix': this.reportMatrixScore,
				//'recency': this.reportRecencyScore,
				//'experience': this.reportExperienceScore,
				'skillscore': this.reportSkillScore
			}
		}
		else if(stype == 'Upskill'){
			
			data = {
				'type': 'Upskill',
				'qtr': this.currentQtr,
				'designation': this.reportDesignation,
				'skill': this.reportSkill,
				'deployment': this.reportDeployment,
				'eid': this.reportEmployeeId,
				'evaluated': this.reportEvaluated,
				'project':this.reportProject,
				'peoplemanager':this.reportPeopleManager,
				//'matrix': this.reportMatrixScore,
				//'recency': this.reportRecencyScore,
				//'experience': this.reportExperienceScore,
				'skillscore': this.reportSkillScore
			}
		}
		else if(stype == 'Horizon3'){
			data = {
				'type': 'Horizon3',
				'qtr': this.reportQtr,
				'designation': this.reportDesignation,
				'skill': this.reportSkill,
				'deployment': this.reportDeployment
			}
		}
		let param = JSON.stringify(data);
		this.getChart(stype,param);
		this.STService.getReport(param).subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					this.reportTable.push(data[i]);
				}
			}
		}, err => {
			console.log(err);
		})
	}

	getChart(stype,param){
		this.STService.getChart(param).subscribe((data : any[])=>{
			if(stype == 'Primary'){
				this.resourceTotalChart['data'] = [];
				this.resourceMatrixChart['dataset'] = [];
				this.resourceRecencyChart['dataset'] = [];
				this.resourceExperienceChart['dataset'] = [];
				var desig = "";
				if(data.length > 0){
					//FOR Skill Score Chart
					var chart1 = data[0];
					for(let i=0;i<chart1.length;i++){
						this.resourceTotalChart['data'].push({"label":''+chart1[i].skill_score, "value":chart1[i].emp})
					}

					//FOR Matrix Score Chart
					var chart2 = data[1];
					for(let i=0;i<chart2.length;i++){
						if(desig != chart2[i].Designation_Name){
							desig = chart2[i].Designation_Name
							this.resourceMatrixChart['dataset'].push({"seriesname":desig, "data":[{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"}]})
						}
						
						var datasetlength = this.resourceMatrixChart['dataset'].length
						if(this.resourceMatrixChart['dataset'][datasetlength - 1].seriesname == chart2[i].Designation_Name){
							var score = Math.ceil(chart2[i].matrix_score);
							this.resourceMatrixChart['dataset'][datasetlength - 1].data[score].value = +this.resourceMatrixChart['dataset'][datasetlength - 1].data[score].value+chart2[i].emp;
						}
					}

					desig = '';
					//FOR Recency Score Chart
					var chart3 = data[2];
					for(let i=0;i<chart3.length;i++){
						if(desig != chart3[i].Designation_Name){
							desig = chart3[i].Designation_Name
							this.resourceRecencyChart['dataset'].push({"seriesname":desig, "data":[{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"}]})
						}
						
						var datasetlength = this.resourceRecencyChart['dataset'].length
						if(this.resourceRecencyChart['dataset'][datasetlength - 1].seriesname == chart3[i].Designation_Name){
							var score = Math.ceil(chart3[i].recency_score);
							this.resourceRecencyChart['dataset'][datasetlength - 1].data[score].value = +this.resourceRecencyChart['dataset'][datasetlength - 1].data[score].value+chart3[i].emp;
						}
					}

					desig = '';
					//FOR Experience Score Chart
					var chart4 = data[3];
					for(let i=0;i<chart4.length;i++){
						if(desig != chart4[i].Designation_Name){
							desig = chart4[i].Designation_Name
							this.resourceExperienceChart['dataset'].push({"seriesname":desig, "data":[{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"}]})
						}
						
						var datasetlength = this.resourceExperienceChart['dataset'].length
						if(this.resourceExperienceChart['dataset'][datasetlength - 1].seriesname == chart4[i].Designation_Name){
							var score = Math.ceil(chart4[i].experience_score);
							this.resourceExperienceChart['dataset'][datasetlength - 1].data[score].value = +this.resourceExperienceChart['dataset'][datasetlength - 1].data[score].value+chart4[i].emp;
						}
					}
				}
			} // End for Primary Chart
			else if(stype == 'Upskill' && this.reportEmployeeId != 0){
				this.upskillIndividualChart['data'] = [];
				this.upskillTrendChart['dataset'] = [];
				this.upskillTrendChart['categories'][0].category = [];
				let dataval = [];
				//For polulating X axis with last 8 qtrs value 
				//(i will start from 7 as quarter array will always have 8 values.To show less no. of qtrs start i from less than 7)
				let xaxislen = 5;
				for(let i=xaxislen-1;i>=0;i--){
					this.upskillTrendChart['categories'][0]['category'].push({"label":this.quarter[i]});
				}
				if(data.length > 0){

					//FOR Trend Chart Avg Score
					var chart1 = data[0];
					var desig = "";
					var skill = "";
					for(let i=0;i<chart1.length;i++){
						if(desig != chart1[i].Designation_Name || skill != chart1[i].s_name){
							desig = chart1[i].Designation_Name;
							skill = chart1[i].s_name;
							this.upskillTrendChart['dataset'].push({"seriesname":"Avg Score:"+desig+"-"+skill, "data":[]});
							var datasetlength = this.upskillTrendChart['dataset'].length;
							for(let j=0;j<xaxislen;j++){
								this.upskillTrendChart['dataset'][+datasetlength - 1].data.push({"value":"0"});
							}
						}
						
						for(let j=0;j<this.upskillTrendChart['categories'][0]['category'].length;j++){
							if(this.upskillTrendChart['categories'][0]['category'][j].label == chart1[i].evaluation_qtr){
								var datasetlength = this.upskillTrendChart['dataset'].length;
								if(this.upskillTrendChart['dataset'][+datasetlength - 1].seriesname == "Avg Score:"+desig+"-"+skill){
									this.upskillTrendChart['dataset'][+datasetlength - 1].data[j].value = chart1[i].skill_score;
								}

							}
						}
					}

					//FOR Trend Chart Individual Score
					desig = '';
					skill = '';
					var chart2 = data[1];
					for(let i=0;i<chart2.length;i++){
						if(desig != chart2[i].Designation_Name || skill != chart2[i].s_name){
							desig = chart2[i].Designation_Name;
							skill = chart2[i].s_name;
							this.upskillTrendChart['dataset'].push({"seriesname":"Individual Score:"+desig+"-"+skill, "data":[]});
							var datasetlength = this.upskillTrendChart['dataset'].length;
							for(let j=0;j<xaxislen;j++){
								this.upskillTrendChart['dataset'][+datasetlength - 1].data.push({"value":"0"});
							}
						}
						
						for(let j=0;j<this.upskillTrendChart['categories'][0]['category'].length;j++){
							if(this.upskillTrendChart['categories'][0]['category'][j].label == chart2[i].evaluation_qtr){
								var datasetlength = this.upskillTrendChart['dataset'].length;
								if(this.upskillTrendChart['dataset'][+datasetlength - 1].seriesname == "Individual Score:"+desig+"-"+skill){
									this.upskillTrendChart['dataset'][+datasetlength - 1].data[j].value = chart2[i].skill_score;
								}

							}
						}
					}


					//FOR Individual Skill Score Chart
					var chart3 = data[2];
					for(let i=0;i<chart3.length;i++){
						this.upskillIndividualChart['data'].push({"label":''+chart3[i].s_name, "value":chart3[i].skill_score})
					}
				}
			} // End for Upskill Chart
			else if(stype == 'Horizon3'){
				var skill = "";
				this.horizon3ScoreChart['categories'][0]['category'] = [];
				this.horizon3ScoreChart['dataset'][0].data = [];
				this.horizon3ScoreChart['dataset'][1].data = [];
				this.horizon3ScoreChart['dataset'][2].data = [];
				if(data.length > 0){
					for(let i=0;i<data.length;i++){
						if(skill != data[i].s_name){
							skill = data[i].s_name
							var obj = {"label":skill};
							this.horizon3ScoreChart['categories'][0]['category'].push(obj);
							if(skill != ''){
								var categorylen = this.horizon3ScoreChart['categories'][0]['category'].length - 1;
								var s1 = this.horizon3ScoreChart['dataset'][0].data.length;
								var s2 = this.horizon3ScoreChart['dataset'][1].data.length;
								var s3 = this.horizon3ScoreChart['dataset'][2].data.length;
								if(categorylen != s1){
									this.horizon3ScoreChart['dataset'][0].data.push({"value":"0"});
								}
								if(categorylen != s2){
									this.horizon3ScoreChart['dataset'][1].data.push({"value":"0"});
								}
								if(categorylen != s3){
									this.horizon3ScoreChart['dataset'][2].data.push({"value":"0"});
								}
							}
						}

						if(data[i].skill_score == 1){
							this.horizon3ScoreChart['dataset'][0].data.push({"value":data[i].emp})
						}
						if(data[i].skill_score == 2){
							this.horizon3ScoreChart['dataset'][1].data.push({"value":data[i].emp})
						}
						if(data[i].skill_score == 3){
							this.horizon3ScoreChart['dataset'][2].data.push({"value":data[i].emp})
						}
					}

					if(skill != ''){
						categorylen = this.horizon3ScoreChart['categories'][0]['category'].length;
						s1 = this.horizon3ScoreChart['dataset'][0].data.length;
						s2 = this.horizon3ScoreChart['dataset'][1].data.length;
						s3 = this.horizon3ScoreChart['dataset'][2].data.length;
						if(categorylen != s1){
							this.horizon3ScoreChart['dataset'][0].data.push({"value":"0"});
						}
						if(categorylen != s2){
							this.horizon3ScoreChart['dataset'][1].data.push({"value":"0"});
						}
						if(categorylen != s3){
							this.horizon3ScoreChart['dataset'][2].data.push({"value":"0"});
						}
					}
				}
			} // End for Horizon3 Chart
		}, err => {
			console.log(err);
		})
	}

	/*** SETTING TAB ***/
	prepareSettingTab(){
		this.getScoreWeight();
	}
	
	getScoreWeight(){
		this.matrixScoreWeight = 0;
		this.recencyScoreWeight = 0;
		this.experienceScoreWeight = 0;
		
		this.STService.getScoreWeight().subscribe((data : any[])=>{
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					if(data[i].item == "Matrix Score Weight"){
						this.matrixScoreWeight = data[i].value;
					}
					else if(data[i].item == "Recency Score Weight"){
						this.recencyScoreWeight = data[i].value;
					}
					else if(data[i].item == "Experience Score Weight"){
						this.experienceScoreWeight = data[i].value;
					}
					this.lastUpdatedDate = data[i].updated_ts;
					this.lastUpdatedBy = data[i].updated_by;
				}
			}
		}, err => {
			console.log(err);
		})
	}

	//To Validate Scores Weightage. It should always be equal to 1
	validateWeight(){
		let matrixWeight = this.matrixScoreWeight;
		let recencyWeight = this.recencyScoreWeight;
		let experienceWeight = this.experienceScoreWeight;
		if(+matrixWeight+recencyWeight+experienceWeight >= 0.99 && +matrixWeight+recencyWeight+experienceWeight < 1.01){
			this.buttondisabled = false;
		}
		else{
			this.buttondisabled = true;
		}
	}

	updateScoreWeight(){
		let data = {"e_id": this.employeeID,"matrixWeight":this.matrixScoreWeight,"recencyWeight":this.recencyScoreWeight,"experienceWeight":this.experienceScoreWeight};
		let param = JSON.stringify(data);
		this.STService.UpdateScoreWeight(param).subscribe((data : any[])=>{
			let res:any = data;
			if(res){  
			  alert("success")
			}else{
			  alert("error")
			}
		})
	}
}
