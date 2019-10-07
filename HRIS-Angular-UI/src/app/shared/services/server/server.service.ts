import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../global';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ServerService {

  private httpOptions: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    constructor(
        private http:Http,
        private globals: Globals,
        private httpClient: HttpClient,
        private spinner: NgxSpinnerService
    ) {}
    addEmployee(modelData: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/api/addEmployee';
        url+="/?token="+ this.globals.getLoginUserToken() ;
        return this.httpClient.post(
            url,
            modelData,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    addEmployeeBank(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/api/addEmployeeBank';
        url+="/?token="+ this.globals.getLoginUserToken() ;
        return this.httpClient.post(
            url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    addEmployeeFamily(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/api/addEmployeeFamily';
        url+="/?token="+ this.globals.getLoginUserToken() ;

        return this.httpClient.post(url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    addEmployeeMobility(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/api/addEmployeeMobility';
        url+="/?token="+ this.globals.getLoginUserToken() ;
        return this.httpClient.post(url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    addEmployeeEducation(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/api/addEmployeeEducation';
        url+="/?token="+ this.globals.getLoginUserToken() ;
        return this.httpClient.post(url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    storeAssetsInfo(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/employeeAssetsInfo';
        return this.httpClient.post(url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    // Add employee experience details.
    addEmployeeExperience(model: {}) {

      let body = model;

      return this.httpClient.post(
        this.globals.apiBaseURL + '/api/addEmployeeExperience/?token='+ this.globals.getLoginUserToken() ,
        body,
        this.httpOptions
      )
      .toPromise()
      .then(response => response)
      .catch(this.handleError);

    }

    // Add employee history details.
    addEmpHistoryDetails(model:{}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/api/addEmployeeHistory';
        url+="/?token="+ this.globals.getLoginUserToken() ;
        return this.httpClient.post(
            url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    // Add employee skill details.
    addEmployeeSkills(model:{}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/api/addEmployeeSkills';
        url+="/?token="+ this.globals.getLoginUserToken() ;
        return this.httpClient.post(
            url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }


    // Update employee basic details.
    updateEmployeeDetails(modelData) {
        var url = this.globals.apiBaseURL + '/api/updateEmployee/';
        url += modelData.Employee_Id !== undefined ? modelData.Employee_Id : "";
        url+="/?token="+ this.globals.getLoginUserToken() ;

        return this.httpClient.put(
          url,
          modelData,
          this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    // Update employee bank details.
    updateEmpBankDetails(modelData) {
        var url = this.globals.apiBaseURL + '/api/updateEmployeeBank/';
        url += modelData.Employee_Id !== undefined ? modelData.Employee_Id : "";
        url+="/?token="+ this.globals.getLoginUserToken() ;
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.httpClient.put(
            url,
            modelData,
            this.httpOptions
          )
          .toPromise()
          .then(response => {
            this.spinner.hide();//hide wait indicator
            return response;
          })
          .catch(this.handleError);
    }

    // Update employee family/relation details.
    updateEmpFamilyDetails(modelData) {
        var url = this.globals.apiBaseURL + '/api/updateEmployeeFamily/';
        url += modelData.Employee_Id !== undefined ? modelData.Employee_Id : "";
        url+="/?token="+ this.globals.getLoginUserToken() ;
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.httpClient.put(
            url,
            modelData,
            this.httpOptions
          )
          .toPromise()
          .then(response => {
            this.spinner.hide();//hide wait indicator
            return response;
          })
          .catch(this.handleError);
    }

    // Update employee passport details.
    updatePassportDetails(modelData) {
        var url = this.globals.apiBaseURL + '/api/updateEmployeeMobility/';
        url += modelData.Employee_Id !== undefined ? modelData.Employee_Id : "";
        url+="/?token="+ this.globals.getLoginUserToken() ;
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.httpClient.put(
            url,
            modelData,
            this.httpOptions
          )
          .toPromise()
          .then(response => {
            this.spinner.hide();//hide wait indicator
            return response;
          })
          .catch(this.handleError);
    }

    // Update employee education details.
    updateEducationDetails(modelData) {
        var url = this.globals.apiBaseURL + '/api/updateEmployeeEducation/';
        url += modelData.Employee_Id !== undefined ? modelData.Employee_Id : "";
        url+="/?token="+ this.globals.getLoginUserToken() ;
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.httpClient.put(
            url,
            modelData,
            this.httpOptions
          )
          .toPromise()
          .then(response => {
            this.spinner.hide();//hide wait indicator
            return response;
          })
          .catch(this.handleError);
    }

    // Update employee experience details.
    updateEmpExperienceDetails(modelData) {
        var url = this.globals.apiBaseURL + '/api/updateEmployeeExperience';
        url+="/?token="+ this.globals.getLoginUserToken() ;
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.httpClient.put(
            url,
            modelData,
            this.httpOptions
          )
          .toPromise()
          .then(response => {
            this.spinner.hide();//hide wait indicator
            return response;
          })
          .catch(this.handleError);
    }

    // Delete employee experience details.
    deleteEmpExperienceDetails(expId) {
        var url = this.globals.apiBaseURL + '/api/deleteEmployeeExperience/' + expId;
        url+="/?token="+ this.globals.getLoginUserToken() ;
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.httpClient.delete(url).toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    // Update employee skill details.
    updateEmpSkillsDetails(modelData) {
        var url = this.globals.apiBaseURL + '/api/updateEmployeeSkills';
        url+="/?token="+ this.globals.getLoginUserToken() ;
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.httpClient.put(
            url,
            modelData,
            this.httpOptions
          )
          .toPromise()
          .then(response => {
            this.spinner.hide();//hide wait indicator
            return response;
          })
          .catch(this.handleError);
    }

    // Update employee history details.
    updateEmpHistoryDetails(modelData) {
        var url = this.globals.apiBaseURL + '/api/updateEmployeeHistory';
        url+="/?token="+ this.globals.getLoginUserToken() ;
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.httpClient.put(
            url,
            modelData,
            this.httpOptions
          )
          .toPromise()
          .then(response => {
            this.spinner.hide();//hide wait indicator
            return response;
          })
          .catch(this.handleError);
    }
    filterEducation(model: {}, data) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/filterEmpEducation';
        url+="/?status=" + data +"&token="+ this.globals.getLoginUserToken() ;

        return this.httpClient.post( url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    filterExperience(model: {}, data) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/filterEmpExperience';
        url+="/?status=" + data + "&token="+ this.globals.getLoginUserToken() ;
        this.spinner.show();
        return this.httpClient.post(url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    filterContactdetails(model: {}) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/filterEmpContact';
        url+="/?token="+ this.globals.getLoginUserToken() ;
        return this.httpClient.post(url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide();//hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }

    filterPersonalDetails(model : {}, data) {
        const headers = new Headers({'Content-Type': 'application/json'});
        var url = this.globals.apiBaseURL + '/filterPersonalDetails';
        url+="/?status="+ data +"&token="+ this.globals.getLoginUserToken() ;
        return this.httpClient.post(url,
            model,
            this.httpOptions
        )
        .toPromise()
        .then(response => {
          this.spinner.hide(); //hide wait indicator
          return response;
        })
        .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred while fetching the employee details.', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
