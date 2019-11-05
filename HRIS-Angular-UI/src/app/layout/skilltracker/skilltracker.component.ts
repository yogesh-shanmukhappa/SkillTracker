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
    logitivityScore:Array<any> = [];
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

    constructor(
        private http: Http, private globals : Globals, private STService : SkilltrackerService
    ) {
        STService.getPrimarySkills().subscribe((data : any[])=>{
            if(data.length > 0){
                for(let i=0;i<data.length;i++){
                let dt = data[i].s_name;
                    dt.replace(' ','_');
                    data[i].s_model = dt;
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
        this.evaluationQrtr = this.STService.getQuarter();
        this.columns = this.STService.getColumns();
        //this.skillDetails = this.STService.getPrimarySkills();
        //console.log(this.skillDetails);
        this.logitivityScore = this.STService.getLogitivityScore();
        this.experienceScore = this.STService.getExperienceScore();
        this.Evaluated = this.STService.getEvaluatedDetails(); 
        this.employeeId = this.STService.getEmployeeDetails();
        this.managerColumns = this.STService.getManagerColoumns();
        //this.EvaluatedData = this.STService.getPrimarySkills();
        this.horizonSkills.Acepta = false;

        
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
      }

    filterLogitivityScore(param) {

    }

    onSubmit() {

    }

    onReset() {

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
