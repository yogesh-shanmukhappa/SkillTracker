import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

import 'rxjs/add/operator/toPromise';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class EmployeeService {

  private listEmployeesUrl = 'http://localhost:8181/employeeId11';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
   ){

  }

  getEmployees(): Promise<any> {
    this.spinner.show();//show wait indicator
    return this.httpClient.get(this.listEmployeesUrl)
            .toPromise()
            .then(response => {
              this.spinner.hide();//hide wait indicator
              return response;
            })
            .catch(this.handleError);

  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred while fetching the list of employees', error); // for demo purposes only
    this.spinner.hide();//hide wait indicator
    return Promise.reject(error.message || error);
  }

}
