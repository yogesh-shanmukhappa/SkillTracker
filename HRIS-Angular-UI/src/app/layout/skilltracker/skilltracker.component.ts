import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
    matrixScore:Array<any> = [];
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
                    data[i].evaluatedDate = "-";
                    data[i].skillScore = "0";
                    if(data[i].s_type.toLowerCase() == 'primary'){
                        this.skillDetails.push(data[i]);
                    } else {
                        this.secondarySkillDetails.push(data[i]);
                    }
                }
            }
        }, err => {
            console.log(err);
            /*var data = [{"s_id":1,"s_name":"Java","s_type":"primary","timestamp":"2019-11-03T18:14:35.000Z","deleted_ts":"2019-11-03T18:14:35.000Z"},{"s_id":2,"s_name":"PHP","s_type":"horizon3","timestamp":"2019-11-03T18:14:50.000Z","deleted_ts":"2019-11-03T18:14:50.000Z"},{"s_id":3,"s_name":"Angular","s_type":"horizon3","timestamp":"2019-11-04T17:05:54.000Z","deleted_ts":"2019-11-04T17:05:54.000Z"},{"s_id":4,"s_name":"NodeJs","s_type":"primary","timestamp":"2019-11-04T17:05:54.000Z","deleted_ts":"2019-11-04T17:05:54.000Z"}];
            if(data.length > 0){
                for(let i=0;i<data.length;i++){
                    if(data[i].s_type.toLowerCase() == 'primary'){
                        this.skillDetails.push(data[i]);
                    } else {
                        this.secondarySkillDetails.push(data[i]);
                    }
                }
            }*/
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

    /*numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
      }*/

    calculateSkillScore(index,param,_inx) {
        this.skillMaster[index]=param;
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

    onSubmit() {
        var jsonData = []
        for(var i=0;i<this.skillDetails.length;i++){
            var obj = {
                "e_id" : 0,
                "s_id" : this.skillDetails[i].s_id,
                "s_type": "Primary",
                "matrix_score" : this.skillDetails[i].matrixScore,
                "longivity_score" : this.skillDetails[i].longivityScore,
                "experience_score" : this.skillDetails[i].experienceScore,
                "skill_score" : this.skillDetails[i].skillScore,
                "evaluated" : "0",
                "manager_e_id" : 0
            };
            jsonData.push(obj);
        }
        let fd = new FormData();
        let passDetails = JSON.stringify(jsonData);
        fd.append('jsonData',passDetails);

        this.STService.saveSkillInformation(fd).subscribe(data=>{
            let res:any = data;
            if(res.status == "success"){
              alert("success")
            }else{
              alert("error")
            }
          });
        

    }

    changeHorizonBox(data,_skill){;
        this.isDataAddedinHorizon = data;
        let indexNo = this.skillsAddedfromPopup.indexOf(_skill)
        if(data && indexNo == -1){
            this.skillsAddedfromPopup.push(_skill);
        } else if(indexNo >= 0){
            this.skillsAddedfromPopup.splice(indexNo,1);
        }
        console.log(this.skillsAddedfromPopup);
    }
    onClickSubmit(evnt){
        this.horizonSkillDetails = [];
        this.submittedData = true;
        for(let i=0;i<this.skillsAddedfromPopup.length ;i ++){
            this.horizonSkillDetails.push({
                skill:this.skillsAddedfromPopup[i],
                isEnable: true
            });
            console.log(this.horizonSkillDetails);
        }
        this.closeModalDialog();
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

     resetHorizon(){
        this.horizonSkillDetails = [];

     }

    /*** Approval section: tab2 ***/
    
    filterApproval(event){
        
    }

}
