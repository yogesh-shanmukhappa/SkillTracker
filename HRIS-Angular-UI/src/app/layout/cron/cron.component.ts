import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Http, ResponseContentType } from '@angular/http';
import { Globals } from '../../shared';
import {FormGroup, FormControl, Validators}  from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CronService } from '../../provider/cron/cron.service'

@Component({
	selector: 'app-cron',
	templateUrl: './cron.component.html',
	styleUrls: ['./cron.component.scss'],
	animations: [routerTransition()]
})
export class CronComponent implements OnInit {

	cronJobs: Array<any> = [];

	constructor(private http: Http, private globals : Globals, private CService : CronService) {
		this.loadCronJobs();
	}

	ngOnInit() {

	}

	loadCronJobs(){
		this.cronJobs = [];
	
		this.CService.getCronJobsList().subscribe((data : any[])=>{
			//console.log(data);
			if(data.length > 0){
				for(let i=0;i<data.length;i++){
					this.cronJobs.push(data[i]);
				}
			}
		}, err => {
			console.log(err);
		})
	}

	runCron(id){
		let param = JSON.stringify({"id":id});
		//console.log(param);
		this.CService.runCron(param).subscribe((data : any[])=>{
			this.loadCronJobs();
			
			
		}, err => {
			console.log(err);
		})
	}

}
