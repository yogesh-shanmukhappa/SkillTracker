import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, ResponseContentType } from '@angular/http';
import { Globals } from '../../shared';
import {FormGroup, FormControl, Validators}  from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SkilltrackerService } from '../../provider/skilltracker/skilltracker.service'


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

    employeeID = 'EMP0001';
    role = 0;

    skillDetails: Array<any> = [];
    secondarySkillDetails : Array<any> = [];
    horizonSkillDetails:Array<any> = [];
    display='none';

    //Below variables are used to populate the values in respective score dropdowns
    matrixScoreOption:Array<any> = [];
    longivityScoreOption:Array<any> = [];
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
    approvalHorizon3SkillDetails : Array<any> = [];

    //Below are the varibles used for reporting
    filterOption = 'Primary';
    reportOption = 'Primary';
    reportQtr:string;
    reportDesignation=0;
    reportSkill=0;
    reportDeployment = -1;
    reportEmployeeId = 0;
    reportEvaluated = -1;
    reportMatrixScore = 0;
    reportProject = 0;
    reportPeopleManager = 0;
    reportLongivityScore = 0;
    reportExperienceScore = 0;
    reportSkillScore = 0;
    designationList:Array<any> = [];
    skillList:Array<any> = [];
    reportEmployeeList:Array<any> = [];
    reportColumns:Array<any> = [];
    reportTable:Array<any> = [];
	
    constructor(private http: Http, private globals : Globals, private STService : SkilltrackerService) {
        this.loadCurrentSkills();
        this.getApprovalEmployeeList();
    }

    ngOnInit() {
        this.evaluationQrtr = this.getEvaluationQuarter();
        

        //For Priamry Skills 
        this.matrixScoreOption = [{'id':0,'name':'Select Score'},{'id':1,'name':'1 - Basic'},{'id':2,'name':'2 - Intermediate1'},{'id':3,'name':'3 - Intermediate2'},{'id':4,'name':'4 - Expert'} ];
        this.longivityScoreOption = [{'id':0,'name':'Select score'},{id:1, name:"1 - More Than 18 Months"},{id:2, name:"2 - 8 to 18 Months"},{id:3, name:"3 - 4 to 7 Months"},{id:4, name:"4 - 0 1o 3 Months"}];
        this.experienceScoreOption = [{'id':0,'name':'Select score'},{id:1, name:"1 - 0 to 3 Months"},{id:2, name:"2 - 4 to 7 Months"},{id:3, name:"3 - 8 to 15 Months"},{id:4, name:"4 - More Than 18 Months"}];

        //FOr Horizon3 Skills
        this.horizonSkillScoreOption = [{id:1, name:'Beginner'},{id:2, name:'Intermediate'},{id:3, name:'Advanced'}];  
    }

    //For Populating Evaluation Quarter List
    getEvaluationQuarter() {
        var month;
        var year;
        month = new Date().getMonth()+1;
        year = new Date().getFullYear();
		this.currentQtr = "FY "+year+' Q'+Math.floor(month/3);
        this.quarter.push("FY "+year+' Q'+Math.floor(month/3));
        for(var i=1;i<=7;i++){
            month = month-3;
            if(month<3){
                month = 12;
                year--;
            }
            this.quarter.push("FY "+year+' Q'+Math.floor(month/3));
        }
        return this.quarter;
    }

    //For Creating Default/Current Qtr tables of Primary & Horizon3 Skills 
    loadCurrentSkills(){
        this.skillDetails = [];
        this.secondarySkillDetails = [];
        this.horizonSkillDetails = [];

        let _jsonDtPrime = {"e_id": this.employeeID,"s_type":"Primary"}
        let _jsonDtHorizon3 = {"e_id": this.employeeID,"s_type":"Horizon3"}

        //PRIMARY SKILL DETAILS
        let param = JSON.stringify(_jsonDtPrime);
        this.STService.getLatestSkillDetails(param).subscribe((data : any[])=>{
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
        this.STService.getLatestSkillDetails(param).subscribe((data : any[])=>{
            if(data.length > 0){
                for(let i=0;i<data.length;i++){
                    let dt = data[i].s_name;
                    dt.replace(' ','_');
                    data[i].s_model = dt;
                    this.secondarySkillDetails.push(data[i]);
                    if(data[i].id){
                        this.horizonSkillDetails.push(data[i]);
                        this.secondarySkillDetails[i].checked = true;
                    }
                }
            }
        }, err => {
            console.log(err);
        })
    }

    //For Creating History Qtr tables of Primary & Horizon3 Skills 
    loadHistorySkills(selectedQtr){
        this.skillDetails = [];
        this.secondarySkillDetails = [];
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
                    let dt = data[i].s_name;
                    dt.replace(' ','_');
                    data[i].s_model = dt;
                    this.secondarySkillDetails.push(data[i]);
                    if(data[i].e_id){
                        this.horizonSkillDetails.push(data[i]);
                    }
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
        var sumnum = (+this.skillDetails[_inx].matrix_score*0.5) + (+this.skillDetails[_inx].longivity_score*0.2) + (+this.skillDetails[_inx].experience_score*0.3);
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
    					"longivity_score" : this.skillDetails[i].longivity_score,
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
                console.log(data);
                console.log(res);
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
				var obj_s = {
                    "evaluation_qtr":this.currentQtr,
					"e_id" : this.employeeID,
					"s_id" : this.horizonSkillDetails[i].s_id,
					"s_type": "Horizon3",
					"matrix_score" : 0,
					"longivity_score" : 0,
					"experience_score" : 0,
					"evaluated" : "0",
					"manager_e_id" : 0,
					"skill_score" : this.horizonSkillDetails[i].skill_score
				};
				jsonData.push(obj_s);
				passDetails = JSON.stringify(jsonData);
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

    //For Updating Horizon3 table based on the Modal Selection
    changeHorizonBox(model,inx){
        let indexNo = -1
		for(var i=0;i<this.horizonSkillDetails.length;i++){
			if(this.horizonSkillDetails[i].s_id == this.secondarySkillDetails[inx].s_id){
				indexNo = i;
				break;
			}
		}
        if(model && indexNo == -1){
            this.horizonSkillDetails.push(this.secondarySkillDetails[inx]);
        } else if(indexNo >= 0){
            this.horizonSkillDetails.splice(indexNo,1);
        }
    }

    //For Opening Horizon3 Skills List Modal
    openModalDialog(){
        this.display='block'; //Set block css
    }
    
    //For Closing Horizon3 Skills List Modal
    closeModalDialog(){
      this.display='none'; //set none css after close dialog
    }
	 
	/*** Approval section: tab2 ***/
    prepareApprovalTab(){
        this.approvalQtr = this.currentQtr;
        if(this.approvalSkillDetails.length >0){
            this.approvalEmployeeId = this.approvalSkillDetails[0].e_id;   
        }
        else{
            this.approvalEmployeeId = "0";
        }
        this.evaluationStatusOption = [{id:0, name:'Pending'},{id:1, name:'Approved'}];
    }
    
    //For Checking to Show or Hide Approval Tab and To Populate Employee Drop Down List
    getApprovalEmployeeList(){
        this.employeeList = [];
        let emp = {"e_id":this.employeeID};
        let param = JSON.stringify(emp);
        this.STService.getApprovalEmployeeList(param).subscribe((data : any[])=>{
            if(data.length > 0){
                this.role = 1;
                for(let i=0;i<data.length;i++){
                    this.employeeList.push(data[i]);
                }
            }
        }, err => {
            console.log(err);
        })
    }

    getApprovalData(){
        this.approvalSkillDetails = [];
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
    calculateApprovalSkillScore(_inx) {
        var sumnum = (+this.approvalSkillDetails[_inx].matrix_score*0.5) + (+this.approvalSkillDetails[_inx].longivity_score*0.2) + (+this.approvalSkillDetails[_inx].experience_score*0.3);
        this.approvalSkillDetails[_inx].skill_score = sumnum;
    }

    //For Updating Approval Records in the table
    saveApprovalData(skillIndex) {
        if(skillIndex == 1 || skillIndex == '1'){
            var jsonData = [];
            let passDetails:string;
            for(var i=0;i<this.approvalSkillDetails.length;i++){
                var obj = {
                    "id":this.approvalSkillDetails[i].id,
                    "evaluation_qtr":this.approvalQtr,
                    "e_id" : this.approvalEmployeeId,
                    "s_id" : this.approvalSkillDetails[i].s_id,
                    "s_type": "Primary",
                    "matrix_score" : this.approvalSkillDetails[i].matrix_score,
                    "longivity_score" : this.approvalSkillDetails[i].longivity_score,
                    "experience_score" : this.approvalSkillDetails[i].experience_score,
                    "skill_score" : this.approvalSkillDetails[i].skill_score,
                    "evaluated" : this.approvalSkillDetails[i].evaluated,
                    "manager_e_id" : this.employeeID
                    
                };
                jsonData.push(obj);
                passDetails = JSON.stringify(jsonData);
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
                        "longivity_score" : 0,
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
            });
        }
        this.getApprovalData();
    }

    /*** Report section: tab3 ***/
    prepareReportTab(){
        this.reportQtr = this.currentQtr;
        this.getDesignation();
        this.getSkills();
        this.getReportEmployeeList();
        this.reportColumns = ['Sl No.','Employee Name','Employee Id','Delivery Manager','Designation','Evaluation Quarter','Skill','Matrix Score','Longivity Score','Experience Score','Skill Score','Manager/Consultant Evaluated'];
        this.getReport();
    }

    //If Main Report Filter is Changed
    changedReport(){
        this.filterOption = this.reportOption;
        this.getSkills();
        if(this.reportOption == 'Primary'){
            this.reportColumns = ['Sl No.','Employee Name','Employee Id','Delivery Manager','Designation','Evaluation Quarter','Skill','Matrix Score','Longivity Score','Experience Score','Skill Score','Manager/Consultant Evaluated'];
            this.reportDesignation = 0;
            this.reportSkill = 0;
            this.reportDeployment = -1;
            this.reportEmployeeId = 0;
            this.reportEvaluated = -1;
            this.reportMatrixScore = 0;
            this.reportLongivityScore = 0;
            this.reportExperienceScore = 0;
            this.reportSkillScore =0;


        }
        else if(this.reportOption == 'Horizon3'){
            this.reportColumns = ['Sl No.','Employee Name','Employee Id','Delivery Manager','Designation','Evaluation Quarter','Skill','Rating'];
        }
        else if(this.reportOption == 'Upskill'){

        }
        this.getReport();
    }

    //If Designation Filter is Changed
    changedDesignation(){
        this.getReportEmployeeList();
    }

    //If Skill Filter is Changed
    changedSkill(){
        this.getReportEmployeeList();
    }

    //If Current Deployement Filter is Changed
    changedDeployment(){
        this.getReportEmployeeList();
    }



    //For Optgroup Designation for Report Filter
    getDesignation(){
        this.designationList = [];
        var deptname = "";
        var designation:Array<any> = [];
        this.STService.getDesignation().subscribe((data : any[])=>{
            if(data.length > 0){
                this.role = 1;
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
    getSkills(){
        this.skillList = [];
        let type = {"s_type":this.reportOption};
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
    getReport(){
        this.reportTable = [];
        let data = {};
        if(this.reportOption == 'Primary'){
            
            data = {
                'type': 'Primary',
                'qtr': this.reportQtr,
                'designation': this.reportDesignation,
                'skill': this.reportSkill,
                'deployment': this.reportDeployment,
                'eid': this.reportEmployeeId,
                'evaluated': this.reportEvaluated,
                'matrix': this.reportMatrixScore,
                'longivity': this.reportLongivityScore,
                'experience': this.reportExperienceScore,
                'skillscore': this.reportSkillScore
            }
        }
        else if(this.reportOption == 'Horizon3'){
            data = {
                'type': 'Horizon3',
                'designation': this.reportDesignation,
                'skill': this.reportSkill,
                'deployment': this.reportDeployment
            }
        }
        let param = JSON.stringify(data);
        console.log(param);
        this.STService.getReport(param).subscribe((data : any[])=>{
            console.log(data);
            if(data.length > 0){
                for(let i=0;i<data.length;i++){
                    this.reportTable.push(data[i]);
                }
            }
        }, err => {
            console.log(err);
        })
    }

}
