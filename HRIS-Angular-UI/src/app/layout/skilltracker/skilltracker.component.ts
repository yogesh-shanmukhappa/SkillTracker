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
    role = 1;

    columns: string[];
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
   
    //isPrimarySkills: boolean = true;
    isHorizonSkills:boolean = true;
    //isDataAddedinHorizon:boolean = false;
    
    //logedInForm;
    //horizonSkills = {Acepta: false};
   
    //managerColumns: string[];
    //EvaluatedData:Array<any> = [];
    //skillsAddedfromPopup:Array<any> = [];
    //skillMaster:Array<any> = [0,0,0];
    //skillResult:Array<any> = [];
    //skillModels:Array<any> = [];
    //scoreAvailable: boolean = false;
	
    constructor(private http: Http, private globals : Globals, private STService : SkilltrackerService) {
        this.loadCurrentSkills();
    }

    ngOnInit() {
        this.evaluationQrtr = this.getEvaluationQuarter();

        //For Priamry Skills 
        this.columns = this.STService.getColumns();
        this.matrixScoreOption = this.STService.getMatrixScoreOption();
        this.longivityScoreOption = this.STService.getLongivityScoreOption();
        this.experienceScoreOption = this.STService.getExperienceScoreOption();

        //FOr Horizon3 Skills
        this.horizonSkillScoreOption = this.STService.getHorizonSkillScoreOption();    
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
                    if(data[i].e_id){
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
        console.log(this.skillDetails);
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
        /*if(event.toLowerCase() == "select evaluation quarter"){
            this.isPrimarySkills = false;
            this.isHorizonSkills = false;
        }
        else{
            this.isPrimarySkills = true;
            this.isHorizonSkills = true;
        }*/
    }

    //For Calculating Skill Score of Primary Skills on Matrix, Logivity & Experience score change
    calculateSkillScore(_inx) {
        var sumnum = +this.skillDetails[_inx].matrix_score + +this.skillDetails[_inx].longivity_score + +this.skillDetails[_inx].experience_score;
        this.skillDetails[_inx].skill_score = sumnum/3;
    }    

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
			console.log(this.horizonSkillDetails);
			for(var i=0;i<this.horizonSkillDetails.length;i++){
				var obj_s = {
					"e_id" : this.employeeID,
					"s_id" : this.horizonSkillDetails[i].s_id,
					"s_type": "Horizon3",
					"matrix_score" : 0,
					"longivity_score" : 0,
					"experience_score" : 0,
					"evaluated" : "0",
					"manager_e_id" : 0,
					"skill_score" : this.horizonSkillDetails[i].skill_status
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


    onHorizon3Select(evnt){
        this.closeModalDialog();
    }

    openModalDialog(){
        this.display='block'; //Set block css
    }
    
    closeModalDialog(){
      this.display='none'; //set none css after close dialog
    }
	 
	addHorizonSkills(data, _index) {
		this.horizonSkillDetails[_index].skill_status = data;
	}

    /*** Approval section: tab2 ***/
    prepareApprovalTab(){
        this.employeeList = [];
        this.getEmployeeList();
        this.approvalQtr = this.currentQtr;
        if(this.approvalSkillDetails.length >0){
            this.approvalEmployeeId = this.approvalSkillDetails[0].e_id;   
        }
        else{
            this.approvalEmployeeId = "0";
        }
        this.evaluationStatusOption = this.STService.getEvaluationStatusOption();
    }
    
    getEmployeeList(){
        this.STService.getEmployeeList().subscribe((data : any[])=>{
            if(data.length > 0){
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
                    //this.approvalSkillDetailsHistory.push(data[i]);
                }
            }
            //this.approvalSkillDetailsHistory = cloneDeep(this.approvalSkillDetails);
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
        var sumnum = +this.approvalSkillDetails[_inx].matrix_score + +this.approvalSkillDetails[_inx].longivity_score + +this.approvalSkillDetails[_inx].experience_score;
        this.approvalSkillDetails[_inx].skill_score = sumnum/3;
    }


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
            console.log(passDetails);
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
            console.log(this.horizonSkillDetails);
            for(var i=0;i<this.horizonSkillDetails.length;i++){
                var obj_s = {
                    "e_id" : this.employeeID,
                    "s_id" : this.horizonSkillDetails[i].s_id,
                    "s_type": "Horizon3",
                    "matrix_score" : 0,
                    "longivity_score" : 0,
                    "experience_score" : 0,
                    "evaluated" : "0",
                    "manager_e_id" : 0,
                    "skill_score" : this.horizonSkillDetails[i].skill_status
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

}
