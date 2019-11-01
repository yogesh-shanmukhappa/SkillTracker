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
    skillDetails: string[];
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

    constructor(
        private http: Http, private globals : Globals, private STService : SkilltrackerService
    ) {

    }

    ngOnInit() {
        this.evaluationQrtr = this.STService.getQuarter();
        this.columns = this.STService.getColumns();
        this.skillDetails = this.STService.getPrimarySkills();
        this.logitivityScore = this.STService.getLogitivityScore();
        this.experienceScore = this.STService.getExperienceScore();
        this.Evaluated = this.STService.getEvaluatedDetails(); 
        this.employeeId = this.STService.getEmployeeDetails();
        this.managerColumns = this.STService.getManagerColoumns();
        this.EvaluatedData = this.STService.getPrimarySkills();
        this.horizonSkills.Acepta = false;
    }

    changeHorizonBox(data,_skill){;
        if(data)
            this.isDataAddedinHorizon = data;
        /*for(let i=0;i<this.horizonSkillDetails.length;i++){
            if(this.horizonSkillDetails[i].skill.indexOf(_skill) > -1){
                this.horizonSkillDetails.push({
                    skill:_skill,
                    isEnable: data
                });
            }
        }*/
        this.horizonSkillDetails.push({
            skill:_skill,
            isEnable: data
        });
        console.log(this.horizonSkillDetails);
    }
    onClickSubmit(evnt){
        console.log(evnt);
        this.submittedData = true;
        this.closeModalDialog();
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
