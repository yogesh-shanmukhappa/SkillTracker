import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, ResponseContentType } from '@angular/http';
import { Globals } from '../../shared';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-skilltracker',
    templateUrl: './skilltracker.component.html',
    styleUrls: ['./skilltracker.component.scss'],
    animations: [routerTransition()]
})
export class SkilltrackerComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    constructor(
        private http: Http,
        private globals : Globals,
    ) {}

    ngOnInit() {
    console.log("Teeeeeeeeeeest");
    }
    onClickSubmit(event){
    alert('here');
    }

}
