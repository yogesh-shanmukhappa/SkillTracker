import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { PRIMARY_KEY } from '../../mock-data/mock-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class SkilltrackerService {
   service_url="http://127.0.0.1:3000/";
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

   getColumns(): string[]{
      return ["Sl No", "Skills", "Matrix Score", "Longivity Score", "Experience Score", "Skill Score", "Evaluated", "Evaluated on"];
   }

   getMatrixScoreOption(): Array<any> {
      return [{'id':0,'name':'Select Score'},{'id':1,'name':'1 - Basic'},{'id':2,'name':'2 - Intermediate1'},{'id':3,'name':'3 - Intermediate2'},
            {'id':4,'name':'4 - Expert'} ];
   }

   getLongivityScoreOption(): Array<any> {
      return [{'id':0,'name':'Select score'},{id:1, name:"1 - More Than 18 Months"},{id:2, name:"2 - 8 to 18 Months"},{id:3, name:"3 - 4 to 7 Months"},{id:4, name:"4 - 0 1o 3 Months"}];
   }

   getExperienceScoreOption(): Array<any> {
      return [{'id':0,'name':'Select score'},{id:1, name:"1 - 0 to 3 Months"},{id:2, name:"2 - 4 to 7 Months"},{id:3, name:"3 - 8 to 15 Months"},{id:4, name:"4 - More Than 18 Months"}];
   }

   getHorizonSkillScoreOption(): Array<any> {
      return [{id:1, name:'Beginner'},{id:2, name:'Intermediate'},{id:3, name:'Advanced'}];
   }

   getEvaluationStatusOption(): Array<any> {
      return [{id:0, name:'Pending'},{id:1, name:'Approved'}];
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
   getEmployeeList(){
      return this.http.get(this.service_url+'getEmployeeList');
   }

   //For Saving Skills into DB
   saveApprovalData(data){
      return this.http.post(this.service_url+"approveSkillTracker", data, this.httpOptions);
   }
  

}
