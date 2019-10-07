import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import { EmployeeDetails } from './employeedetails';

import 'rxjs/add/operator/toPromise';
import { Globals } from '../../global';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class EmployeeDetailsService {

  constructor(
    private httpClient: HttpClient,
    private globals: Globals,
    private spinner: NgxSpinnerService
  ){}

  getBasicDetails(empid: string): Promise<any> {

    let params = new HttpParams();
    params = params.append('employeeid', empid);
    params = params.append('token',  this.globals.getLoginUserToken() );
    this.spinner.show(); //show wait indicator
    return this.httpClient.get(
      this.globals.apiBaseURL + '/getBasicDetails/',
      {params: params}
    )
    .toPromise()
    .then(response => {
      this.spinner.hide();//hide wait indicator
      return response;
    })
    .catch(this.handleError);

  };

  private handleSuccess(response: any): any {
    this.spinner.hide();
    return response;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
