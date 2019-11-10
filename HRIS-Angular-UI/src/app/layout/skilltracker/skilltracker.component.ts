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
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public evaluationQrtr: string[];
    columns: string[];
    skillDetails: Array<any> = [];
    secondarySkillDetails : Array<any> = [];
    isPrimarySkills: boolean = true;
    isHorizonSkills:boolean = true;
    isDataAddedinHorizon:boolean = false;
    longivityScore:Array<any> = [];
    experienceScore:Array<any> = [];
    Evaluated:Array<any> = [];
    display='none';
    logedInForm;
    horizonSkills = {Acepta: false};
    horizonSkillDetails:Array<any> = [];
    submittedData:boolean = false;
    employeeId:Array<any> = [];
    managerColumns: string[];
    EvaluatedData:Array<any> = [];
    skillsAddedfromPopup:Array<any> = [];

    matrixScore:Array<any> = [];
    skillMaster:Array<any>=[0,0,0];
    skillResult:Array<any>=[];
    skillModels:Array<any>=[];
    constructor(
        private http: Http, private globals : Globals, private STService : SkilltrackerService
    ) {
        STService.getPrimarySkills().subscribe((data : any[])=>{
            if(data.length > 0){
                for(let i=0;i<data.length;i++){
                let dt = data[i].s_name;
                    dt.replace(' ','_');
                    data[i].s_model = dt;
                    data[i].isEvaluated = "No";
                    data[i].evaluatedDate = "05-11-2019";
                    if(data[i].s_type.toLowerCase() == 'primary'){
                        this.skillDetails.push(data[i]);
                    } else {
                        this.secondarySkillDetails.push(data[i]);
                    }
                }
            }
        }, err => {
            console.log(err);
        })

    }

    ngOnInit() {
        this.evaluationQrtr = this.getEvaluationQuarter();
        this.columns = this.STService.getColumns();
        //this.skillDetails = this.STService.getPrimarySkills();
        //console.log(this.skillDetails);
        this.matrixScore = this.STService.getMatrixScore();
        this.longivityScore = this.STService.getLongivityScore();
        this.experienceScore = this.STService.getExperienceScore();
        this.Evaluated = this.STService.getEvaluatedDetails(); 
        this.employeeId = this.STService.getEmployeeDetails();
        this.managerColumns = this.STService.getManagerColoumns();
        //this.EvaluatedData = this.STService.getPrimarySkills();
        this.horizonSkills.Acepta = false;

        
    }

    getEvaluationQuarter() {
        var month;
        var year;
        var quarter:Array<any> = [];
        month = new Date().getMonth()+1;
        year = new Date().getFullYear();
        quarter.push("FY "+year+' Q'+Math.floor(month/3));
        for(var i=1;i<=7;i++){
            month = month-3;
            if(month<3){
                month = 12;
                year--;
            }
            quarter.push("FY "+year+' Q'+Math.floor(month/3));
        }
        return  quarter;
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
      }

    calculateSkillScore(index,param,_inx) {
        this.skillMaster[index]=param;
        //console.log(this.skillDetails);
        if(index == 0){
            this.skillDetails[_inx].matrixScore = param;
        } else if(index == 1){
            this.skillDetails[_inx].longivityScore = param;
        } else if(index == 2){
            this.skillDetails[_inx].experienceScore = param;
        }

        
        var sumNumber = this.skillMaster.reduce((acc, cur) => acc + Number(cur), 0);
        this.skillDetails[_inx].skillScore=sumNumber/3;
        
    }

    onSubmit(skillIndex) {
		if(skillIndex == 1 || skillIndex == '1'){
			var jsonData = [];
			for(var i=0;i<this.skillDetails.length;i++){
				var obj = {
					"e_id" : 0,
					"s_id" : this.skillDetails[i].s_id,
					"s_type": "1",
					"matrix_score" : this.skillDetails[i].matrixScore,
					"longivity_score" : this.skillDetails[i].longivityScore,
					"experience_score" : this.skillDetails[i].experienceScore,
					"evaluated" : "0",
					"manager_e_id" : 0,
					"skill_score" : this.skillDetails[i].skillScore
				};
				jsonData.push(obj);
				let passDetails = JSON.stringify(jsonData);

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
		if(skillIndex == 2 || skillIndex == '2'){
			var jsonData = [];
			console.log(this.horizonSkillDetails);
			for(var i=0;i<this.horizonSkillDetails.length;i++){
				var obj_s = {
					"e_id" : 0,
					"s_id" : this.horizonSkillDetails[i].s_id,
					"s_type": "2",
					"matrix_score" : 0,
					"longivity_score" : 0,
					"experience_score" : 0,
					"evaluated" : "0",
					"manager_e_id" : 0,
					"skill_score" : this.horizonSkillDetails[i].skill_status
				};
				jsonData.push(obj_s);
				let passDetails = JSON.stringify(jsonData);

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

    changeHorizonBox(model,_skill, _data){
        this.isDataAddedinHorizon = model;
		console.log(_data);
		let indexNo = -1
		for(var i=0;i<this.skillsAddedfromPopup.length;i++){
			if(this.skillsAddedfromPopup[i].s_name == _skill){
				indexNo = i;
				break;
			}
		}
		if(model && indexNo == -1){
            this.skillsAddedfromPopup.push(_data);
        } else if(indexNo >= 0){
            this.skillsAddedfromPopup.splice(indexNo,1);
        }
    }
    onClickSubmit(evnt){
        this.horizonSkillDetails = [];
        this.submittedData = true;
        for(let i=0;i<this.skillsAddedfromPopup.length ;i ++){
            this.horizonSkillDetails.push({
                skill:this.skillsAddedfromPopup[i].s_name,
				s_id:this.skillsAddedfromPopup[i].s_id,
				s_model:this.skillsAddedfromPopup[i].s_model,
				s_type:this.skillsAddedfromPopup[i].s_type,
                isEnable: true,
				skill_status: 0
            });
        }
        this.closeModalDialog();
		console.log(this.secondarySkillDetails);
    }

    skillLevel() {
        
    }

    filterForeCasts(event){
        console.log(event);
        if(event.toLowerCase() == "select evaluation quarter"){
            this.isPrimarySkills = false;
            this.isHorizonSkills = false;
        }
        else{
            this.isPrimarySkills = true;
            this.isHorizonSkills = true;
        }
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
    
    filterApproval(event){
        
    }

}
