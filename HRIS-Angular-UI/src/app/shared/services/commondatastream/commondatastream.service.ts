import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

import { Globals } from '../../global';

@Injectable()
export class CommonDataStreamService {

    private baseURL = this.globals.apiBaseURL + '/';

    dataStream : any;

    private httpOptions: any = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http:Http,
        private httpClient: HttpClient,
        private globals: Globals,
        private spinner: NgxSpinnerService
    ){}

    commonDataStream(): Promise<any> {
      this.spinner.show(); //show wait indicator

        var url1 = this.baseURL + 'basicDetails/?token='+ this.globals.getLoginUserToken() ;
        return this.httpClient.get(url1)
        .toPromise()
        .then(response => {
          this.spinner.hide(); //hide wait indicator

            this.dataStream = response[0].data;
            return response;
        })
        .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
