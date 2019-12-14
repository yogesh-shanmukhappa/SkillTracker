import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { PRIMARY_KEY } from '../../mock-data/mock-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class CronService {
	service_url="http://ec2-18-222-13-127.us-east-2.compute.amazonaws.com:3000/";
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json',
			'Authorization': 'my-auth-token'
		})
	};

	constructor(public http:HttpClient) { }

	getPrimaryKeys(): Observable<any[]>{
		return Observable.of(PRIMARY_KEY).delay(100);
	}

	//For getting list of cron Jobs
	getCronJobsList(){
		return this.http.get(this.service_url+"getCronJobsList");
	}

	//For getting list of cron Jobs
	runCron(data){
		return this.http.post(this.service_url+"runCronNow",data,this.httpOptions);
	}
}
