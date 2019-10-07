import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HeaderForm } from './headerform.interface';
import { CommonDataStreamService } from '../../services';
import { Globals } from '../../global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  employeeIdNames : any;
  role = 0;
  employeeName: string =  '' ;
  username: string =  '' ;
  employeedetail: string = '';
  NotifySOW : any;
  sowApprover : boolean = false;
  ifApprover : boolean = false;
  ifNotApprover : boolean = false;
  employeeid: string;
  loginid: string;
  dataStream: any;
  notifySowLength : number;
  active_employees : any =[];

  invReqs:any =[];
  showInvReqs: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globals: Globals,
    public cds: CommonDataStreamService,
  ) {
    this.role = this.globals.getLoginUserRole();
    this.employeeName =  this.globals.getLoginUserFullName() ;
    this.username =  this.globals.getLoginUsername() ;
  }

  ngOnInit(): void {
    this.dataStream = this.cds.dataStream;
  }
}
