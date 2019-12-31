import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { PRIMARY_KEY } from '../../mock-data/mock-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class SkilltrackerService {
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

	getReportColumns(): string[]{
		return ["Sl No", "Skills", "Matrix Score", "Longivity Score", "Experience Score", "Skill Score", "Evaluated", "Evaluated on"];
	}

	//For Getting Current Qtr Skills
	getLatestSkillDetails(data){
		return this.http.post(this.service_url+'getDefaultSkillDetails',data,this.httpOptions);
	}

	//For History Qtr Skills
	getHistorySkillDetails(data){
		return this.http.post(this.service_url+'getSkillDetailsHistory',data,this.httpOptions);
	}

	//For Saving Skills into DB
	saveSkillInformation(data){
		return this.http.post(this.service_url+"addSkillTracker", data, this.httpOptions);
	}

	//GET Employee List
	getApprovalEmployeeList(data){
		return this.http.post(this.service_url+'getApprovalEmployeeList', data, this.httpOptions);
	}

	//For Saving Skills into DB
	saveApprovalData(data){
		return this.http.post(this.service_url+"approveSkillTracker", data, this.httpOptions);
	}
	
	//For Getting Designation for Report Filters
	getDesignation(){
		return this.http.get(this.service_url+"getDesignationList");
	}

	//For Getting Skills for Report Filters
	getSkillsList(data){
		return this.http.post(this.service_url+"getSkillsList", data, this.httpOptions);
	}

	//For Getting Employee for Report Filters
	getReportEmployeeList(data){
		return this.http.post(this.service_url+"getReportEmployeeList", data, this.httpOptions);
	}

	//For Generating Report
	getReport(data){
		return this.http.post(this.service_url+"getReport", data, this.httpOptions);
	}

	//For Generating Report
	getChart(data){
		return this.http.post(this.service_url+"getChart", data, this.httpOptions);
	}

	//For Getting Score Weights
	getScoreWeight(){
		return this.http.get(this.service_url+"getScoreWeight");
	}

	//For Update Score Weight
	UpdateScoreWeight(data){
		return this.http.post(this.service_url+"UpdateScoreWeight", data, this.httpOptions);
	}
	 
}
