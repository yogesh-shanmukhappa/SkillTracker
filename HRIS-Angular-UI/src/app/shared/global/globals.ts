import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { Http, Response, ResponseContentType} from "@angular/http";

import { environment } from '../../../environments/environment';

@Injectable()
export class Globals {

  username: string = '';
  userRole: number = 0;
  userFullName: string = '';
  userToken: string = '';

  apiBaseURL: string = '';
  apiServerIP:string = '';

  uiApiEncPwd: string = '';
  uiApiDecPwd: string = '';
  locEncDecPwd: string = '';
  uiApiDecSPwd : string = '';

  pesonalResAccList: string[] = [
    'AAIN0220',
    'AAIN0458',
    'AAIN0521',    'AAIN0068'
  ];

  regex1: any = new RegExp("^[0-9]{4}-[0-9]{1,2}");

  constructor(
    public router: Router,
    private http: Http
  ) {
    this.apiBaseURL = environment.apiServerURL;
    this.uiApiEncPwd = environment.uiApiEncPwd;
    this.uiApiDecPwd = environment.uiApiDecPwd;
    this.locEncDecPwd = environment.locEncDecPwd;
    this.apiServerIP = environment.apiServerURL;
    this.uiApiDecSPwd = environment.uiApiDecSPwd;
  }

  // Get logged in status.
  getLoginStatus(): boolean {
    var ssLS = sessionStorage.getItem('ili');
    return ( ssLS && ssLS !== null ) ? this.getLocalDecryptData( ssLS ).isLoggedin : false;
  }

  // Get logged in username.
  getLoginUsername( newLogin: boolean = false ) {
    var username = '';
    if ( !newLogin && this.username && this.username !== '' ) {
      username = this.username;
    } else {
      var ssUN = sessionStorage.getItem('un');
      username = ssUN !== null ? this.getLocalDecryptData( ssUN ).username : '';
    }
    this.username = username;
    return username;
  }

  // Get logged in employee name.
  getLoginUserFullName( newLogin: boolean = false ) {
    var userFullName = '';
    if ( !newLogin && this.userFullName && this.userFullName !== '' ) {
      userFullName = this.userFullName;
    } else {
      var ssUFL = sessionStorage.getItem('ufl');
      userFullName = ssUFL !== null ? this.getLocalDecryptData( ssUFL ).userFullName : '';
    }
    this.userFullName = userFullName;
    return userFullName;
  }

  // Get logged in user role.
  getLoginUserRole( newLogin: boolean = false ) {
    var userRole = 0;
    if ( !newLogin && this.userRole && this.userRole !== 0 ) {
      userRole = this.userRole;
    } else {
      var ssUR = sessionStorage.getItem('ur');
      userRole = ssUR !== null ? this.getLocalDecryptData( ssUR ).userRole : 0;
    }
    this.userRole = userRole;
    return userRole;
  }

  // Get logged in user token.
  getLoginUserToken( newLogin: boolean = false ): string {
    var userToken = '';
    if ( !newLogin && this.userToken && this.userToken !== '' ) {
      userToken = this.userToken;
    } else {
      var ssTkn = sessionStorage.getItem('tkn');
      userToken = ssTkn !== null ? this.getLocalDecryptData( ssTkn ).token : '';
    }
    this.userToken = userToken;
    return userToken;
  }

  // Get the list of employee role users to give resourcing access.
  getPesonalResAccList(): string[]{
    return this.pesonalResAccList;
  }

  isHRUser(): boolean {
    return this.getLoginUserRole() === 2;
  }

  isManagerUser(): boolean {
    return this.getLoginUserRole() === 4;
  }

  // Reset all login user details on new login.
  resetUserDetails(): void {
    this.getLoginUsername( true );
    this.getLoginUserFullName( true );
    this.getLoginUserRole( true );
    this.getLoginUserToken( true );
  }

  // Return decryted data
  getDecryptData(data:any): any {
    // Decrypt Message
    return JSON.parse(CryptoJS.AES.decrypt(data.toString(), this.uiApiDecPwd).toString(CryptoJS.enc.Utf8));
  }

  // Return decryted data
  getDecryptSData(data:any): any {
    // Decrypt Message
    return JSON.parse(CryptoJS.AES.decrypt(data.toString(), this.uiApiDecSPwd).toString(CryptoJS.enc.Utf8));
  }

  // Return encrypted data
  getEncryptData(data:any): any {
    // Encrypt the whole body
    return  CryptoJS.AES.encrypt(JSON.stringify(data), this.uiApiEncPwd ).toString();
  }

  // Return decryted data
  getLocalDecryptData(data:any): any {
    // Decrypt Message
    return JSON.parse(CryptoJS.AES.decrypt(data.toString(), this.locEncDecPwd).toString(CryptoJS.enc.Utf8));
  }

  // Return encrypted data
  getLocalEncryptData(data:any): any {
    // Encrypt the whole body
    return  CryptoJS.AES.encrypt(JSON.stringify(data), this.locEncDecPwd).toString();
  }

  // Clear session storage.
  clearSessionStorage(): void{
    sessionStorage.removeItem('ili');
    sessionStorage.removeItem('tkn');
    sessionStorage.removeItem('ur');
    sessionStorage.removeItem('un');
    sessionStorage.removeItem('ufl');

    // Remove old session storage if any.
    sessionStorage.removeItem('isLoggedin');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('empname');
    sessionStorage.removeItem('token');
  }

  // Remove seesion storage on logout
  logout( message = undefined ) {
    this.clearSessionStorage();

    this.router.navigate(['/login']);

    if ( message ) {
      console.log(message);
    }
  }

  // Check if the valid text is received.
  isValidText( text: string = undefined ): boolean {
    return (
      text &&
      typeof text === "string" &&
      text.length >= 8
    );
  }

  // Filter out and return the employee ID form any kind of string provided.
  getEmployeeId( text: string = undefined ): string {
    var employeeId = '';
    if ( this.isValidText( text ) ) {
      text = text.toUpperCase();
      var startIndex = -1;

      if ( text.indexOf('AAIN') !== -1 ) {
        startIndex = text.indexOf('AAIN');
        employeeId = text.substr(startIndex, 8);
      }
      else if ( text.indexOf('AAPT') !== -1 ) {
        startIndex = text.indexOf('AAPT');
        employeeId = text.substr(startIndex, 8);
      } else if ( text.indexOf('AINC') !== -1 ) {
        startIndex = text.indexOf('AINC');
        employeeId = text.substr(startIndex, 8);
      }

      if ( employeeId && employeeId.length >= 8 ) {
        var empIdExt = employeeId.substr(4, 4);
        var patt = new RegExp("^[0-9]*$");

        if ( patt.test( empIdExt ) ) {
          return employeeId;
        } else {
          var preStr = text.substr(0, 4);
          text = text.replace(preStr, '');
          if ( text.length >= 8 ) {
            return this.getEmployeeId( text );
          } else {
            return '';
          }
        }
      } else {
        return '';
      }

    } else {
      return '';
    }

  }

  // Return MMM or Full_Name of the month. (accepts ("YYYY-MM-DD", "short"/"long") as params)
  getMonthName(dateStr = null, type = "short"){
    let date = this.getISTDate(dateStr),
    locale = "en-us",
    month = date.toLocaleString(locale, {
      month: type
    });
    return month;
  }

  // Return YearMonth in 'YYYY-MMM' or 'MonthName YYYY' format. (accepts ("YYYY-MM-DD", "short"/"long") as params)
  getYearMonth(dateStr = null, type = "short"){
    let date = this.getISTDate(dateStr),
    locale = "en-us",
    month = date.toLocaleString(locale, {
      month: type
    }),
    year = date.getFullYear();
    if(type == "short") {
      return (year + "-" + month);
    } else {
      return (month + " " + year);
    }
  }

  /* Accepts: "YYYY-MM" or "YYYY-MM-DD" or Date Object. */
  /* Returns: last day in "YYYY-MM-DD" format. */
  getLastDay(dateStr){
    let ad = this.getISTDate(dateStr);
    let year = ad.getFullYear();
    let month = ad.getMonth() + 1;
    let lastDate = new Date(year, month, 0);
    let lday = lastDate.getDate();
    return year + "-" + ( month <= 9 ? ("0" + month) : month ) + "-" + lday;
  }


  /**
   * Returns date for a given date object.
   *
   * @param {date} dateObj The date object for which the date string to be returned.
   * @return {string} date string in the format of "YYYY-MM-DD".
   */
  getFullDate( dateObj ) {

    let month   = dateObj.getMonth() + 1,
        date    = dateObj.getDate();

    let dateStr = dateObj.getFullYear() + "-" +
                  ( ( month <= 9 ) ? ( "0" + month ) : month ) + "-" +
                  ( ( date <= 9 ) ? ( "0" + date ) : date );

    return dateStr;
  }

  /**
   * Returns time for a given date object.
   *
   * @param {date} dateObj The date object for which the date string to be returned.
   * @return {string} time string in the format of "HH:MM:SS".
   */
  getFullTime( dateObj = null ) {
    if ( !dateObj ) {
      dateObj = new Date();
    }
    return this.getFullDateTime( dateObj ? dateObj : new Date() ).split(" ")[1];
  }


  /**
   * Returns date-time for a given date object.
   *
   * @param {date} dateObj The date object for which the date-time string to be returned.
   * @return {string} datetime string in the format of "YYYY-MM-DD HH:MM:SS".
   */
  getFullDateTime(dateObj) {

    let hours   = dateObj.getHours(),
        minutes = dateObj.getMinutes(),
        seconds = dateObj.getSeconds();

    let timeStr = ( ( hours <= 9 ) ? ( "0" + hours ) : hours ) + ":" +
                  ( ( minutes <= 9 ) ? ( "0" + minutes ) : minutes ) + ":" +
                  ( ( seconds <= 9 ) ? ( "0" + seconds ) : seconds );

    return this.getFullDate( dateObj ) + " " + timeStr;
  }


  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil( ( ( ( d.getTime() - yearStart.getTime() ) / 86400000 ) + 1 ) / 7 );
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
  }


  getISTDateTime(dateStr = null){
    if ( dateStr ) {
      // return ( new Date( this.getISTDate(dateStr).toLocaleString("indian", { timeZone: "Asia/Kolkata" }) ) );
      return ( new Date( new Date(dateStr).getTime() + ( ( new Date(dateStr).getTimezoneOffset() + 330 ) * 60 * 1000 ) ) );

    } else {
      // return ( new Date( this.getISTDate().toLocaleString("indian", { timeZone: "Asia/Kolkata" }) ) );
      return ( new Date( new Date().getTime() + ( ( new Date().getTimezoneOffset() + 330 ) * 60 * 1000 ) ) );
    }
  }


  /* Returns IST Date with zero time. */
  getISTDate(
    args0: any = undefined,
    args1: any = undefined,
    args2: any = undefined,
    args3: any = undefined,
    args4: any = undefined,
    args5: any = undefined,
    args6: any = undefined
  ) {

    let IST_Date;

    if( args0 && args1 && args2 && args3 && args4 && args5 && args6 ) {
      IST_Date = new Date( args0, args1, args2, args3, args4, args5, args6 );
    } else if( args0 && args1 && args2 && args3 && args4 && args5 ) {
      IST_Date = new Date( args0, args1, args2, args3, args4, args5 );
    } else if( args0 && args1 && args2 && args3 && args4 ) {
      IST_Date = new Date( args0, args1, args2, args3, args4 );
    } else if( args0 && args1 && args2 && args3 ) {
      IST_Date = new Date( args0, args1, args2, args3 );
    } else if( args0 && args1 && args2 ) {
      IST_Date = new Date( args0, args1, args2 );
    } else if( args0 && args1 ) {
      IST_Date = new Date( args0, args1 );
    } else if( args0 ) {

      if ( args0.length <= 10 ) {
        if ( this.regex1.test( args0 ) ) {
          let dtArr = args0.split("-");
          let dtLen = dtArr.length;
          let y, m, d;
          if ( dtLen >= 3 ) {
            y = parseInt(dtArr[0]);
            m = parseInt(dtArr[1]) - 1;
            d = parseInt(dtArr[2]);
            IST_Date = new Date( y, m, d );
          } else if ( dtLen === 2 ) {
            y = parseInt(dtArr[0]);
            m = parseInt(dtArr[1]) - 1;
            IST_Date = new Date( y, m );
          } else {
            console.log("Unexpected data for date object [args0]:" + args0);
            IST_Date = new Date( args0 );
          }
        } else {
          console.log("Unexpected data for date object [args0]:" + args0);
          IST_Date = new Date( args0 );
        }
      } else {
        IST_Date = new Date( args0 );
      }

    } else {

      // IST_Date = new Date( new Date().toLocaleString("indian", { timeZone: "Asia/Kolkata" }) );
      IST_Date = new Date( new Date().getTime() + ( ( new Date().getTimezoneOffset() + 330 ) * 60 * 1000 ) );

    }

    if ( IST_Date && isNaN( IST_Date.getTime() ) ) {
      console.log("Invalid data for date object creation [args0]:" + args0);
    }

    return IST_Date;

  };

  /* Accepts an array. Returns data type formatted for download */
  getDataTypeFormattedForDownload(data) {

    let fData = data.slice();

    fData.forEach((obj, ind) => {

      if( obj instanceof Array ) {

        obj.forEach((val, vInd) => {
          obj[vInd] = this.getNumberFormat( val );
        });

      } else if( obj instanceof Object ) {

        for(let key in obj) {
          obj[key] = this.getNumberFormat( obj[key] );
        }

      } else {

        fData[ind] = this.getNumberFormat( obj );

      }

    });

    // console.log(fData);
    return fData;
  }

  /* Accepts a value and return in number format if a valid number */
  getNumberFormat(str){
    let regex = new RegExp('^[-]{0,1}[0-9]+[.]{0,1}[0-9]*$');
    let fStr = str;
    if( regex.test(str) ) {
      if( !isNaN( parseFloat(str) ) ) {
        fStr = parseFloat(str);
      }
    }
    return fStr;
  }

  validateFile(file) {
    var format = /[!#$%^&*()+\=\[\]{};':"\\|,<>\/?]/;

    if(format.test(file)) {
      return {
        result: true,
        message : "Only Alphanumeric, dot, underscore and hyphen are allowed in file name"
      }
    }
    return {
      result: false,
      message : ""
    }
  }

  downloadFile(file, fileName) {
    if(fileName.includes('__'))
    {
      fileName = fileName.split('__');
      if(fileName.length > 1)
      {
        fileName.shift();
      }
      fileName = fileName.join('__');
    }
    return this.http
    // .get(file, {
    .get(file + "?token=" + this.getLoginUserToken(), {
      responseType: ResponseContentType.Blob
    })
    .map(res => {
      return {
        filename: fileName,
        data: res.blob()
      };
    })
    .subscribe(res => {
      console.log('start download:',res);
      var url = window.URL.createObjectURL(res.data);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = res.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    }, error => {
      alert('download error: file ' +JSON.stringify(error.statusText));
    }, () => {
      console.log('Completed file download.')
    });
  }

}
