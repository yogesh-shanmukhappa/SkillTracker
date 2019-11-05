import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { PRIMARY_KEY } from '../../mock-data/mock-data';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class SkilltrackerService {
  service_url="http://127.0.0.1:3000/"

  constructor(public http:HttpClient) { }

  getPrimaryKeys(): Observable<any[]>{
    return Observable.of(PRIMARY_KEY).delay(100);
  }

  getColumns(): string[]{
    return ["Sl No", "Skills", "Matrix Score", "Logitivity Score", "Experience Score", "Skill Score", "Evaluated", "Evaluated on"];
  }

  getQuarter(): string[]{
    return ['Q4-2019','Q3-2019','Q2-2019','Q1-2019','Q4-2018','Q3-2018','Q2-2018','Q1-2018'];
  }

  getPrimarySkills(){
    //return ['php','angular','python','java','javascript','html'];
    return this.http.get(this.service_url+'getAllSkillType');
  }

  getLogitivityScore(): Array<any> {
    return [{id:1, name:"1.0"},{id:2, name:"2.0"},{id:3, name:"3.0"},{id:4, name:"4.0"}];
  }

  getExperienceScore(): Array<any> {
    return [{id:1, name:1},{id:2, name:2},{id:3, name:3},{id:4, name:4}];
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

}
