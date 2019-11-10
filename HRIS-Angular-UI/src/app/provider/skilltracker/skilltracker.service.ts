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

  getQuarter(): string[]{
    return ['Q4-2019','Q3-2019','Q2-2019','Q1-2019','Q4-2018','Q3-2018','Q2-2018','Q1-2018'];
  }

  getPrimarySkills(){
    //return ['php','angular','python','java','javascript','html'];
    return this.http.get(this.service_url+'getAllSkillType');
  }

  getMatrixScore(): Array<any> {
    return [{'id':0,'name':'0 - Not Used'},{'id':1,'name':'1 - Basic'},{'id':2,'name':'2 - Intermediate1'},{'id':3,'name':'3 - Intermediate2'},
            {'id':4,'name':'4 - Expert'}];
  }

  getLongivityScore(): Array<any> {
    return [{id:1, name:"1 - More Than 18 Months"},{id:2, name:"2 - 8 to 18 Months"},{id:3, name:"3 - 4 to 7 Months"},{id:4, name:"4 - 0 1o 3 Months"}];
  }

  getExperienceScore(): Array<any> {
    return [{id:1, name:"1 - 0 to 3 Months"},{id:2, name:"2 - 4 to 7 Months"},{id:3, name:"3 - 8 to 15 Months"},{id:4, name:"4 - More Than 18 Months"}];
  }

  getEmployeeDetails(): Array<any> {
    return [{id:2019001, name:'Saismita'},{id:2019002, name:'Debashri'},{id:2009003, name:'Avinandan'}];
  }

  getEvaluatedDetails(): Array<any> {
    return [{id:0, value:'Beginner'},{id:1, value:'Intermediate'},{id:2, value:'Advanced'}];
  }

  getManagerColoumns(): string[] {
    return ["Sl No", "Skills", "Matrix Score", "Logitivity Score", "Experience Score", "Skill Score"];
  }

  geEvaluatedData(): Array<any> {
    return [{id:2019001, name:'Saismita'},{id:2019002, name:'Debashri'},{id:2009003, name:'Avinandan'}];
  }

  saveSkillInformation(data){
      return this.http.post(this.service_url+"addSkillTracker", data, this.httpOptions);
  }
  

}
