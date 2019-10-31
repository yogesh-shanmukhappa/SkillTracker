import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, ResponseContentType } from '@angular/http';
import { Globals } from '../../shared';
import { FormsModule } from '@angular/forms';
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
    isPrimarySkills: boolean = false;
    isHorizonSkills:boolean = false;
    logitivityScore:Array<any> = [];
    experienceScore:Array<any> = [];
    Evaluated:Array<any> = [];

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
        this.Evaluated = [{id:0, value:'NO'},{id:1, value:'YES'}]
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
    onClickSubmit(event){
    alert('here');
    }

    openModal(id){
        alert("Open modal... development going on")
    }

}
