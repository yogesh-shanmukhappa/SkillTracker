import { Component, OnInit } from '@angular/core';
import { Globals } from '../../global';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive = false;
    showMenu = '';
    username : string = '';
    role: number = 0;
    hideProfile: boolean = true;
    hideReport: boolean = true;
    hideAdmin: boolean = true;
    hideResource: boolean = true;
    hideRevenue: boolean = true;

    pesonalResAccList: string[] = [];

    constructor(
      private globals: Globals
    ) {}

    ngOnInit() {
        this.username = this.globals.getLoginUsername();
        this.role = this.globals.getLoginUserRole();
        this.pesonalResAccList = this.globals.getPesonalResAccList();
        switch(this.role) {
            case 1 : this.hideProfile = false;
                     this.hideReport = false;
                     this.hideAdmin = false;
                     this.hideResource = false;
                     this.hideRevenue = false;
                     break;
            case 2 : this.hideProfile = false;
                     this.hideReport = false;
                     this.hideAdmin = false;
                     this.hideResource = true;
                     this.hideRevenue = true;
                    break;
            case 4 : this.hideProfile = false;
                     this.hideReport = false;
                     this.hideAdmin = true;
                     this.hideResource = false;
                     this.hideRevenue = false;
                    break;
            case 8 : this.hideProfile = false;
                     this.hideReport = true;
                     this.hideAdmin = true;
                     this.hideResource = true;
                     this.hideRevenue = true;

                     /* For Anuja's request to give resourcing access to a list of consultants. */
                     if( this.pesonalResAccList.indexOf( this.username ) !== -1 ) {
                       this.hideResource = false;
                     }

                    break;
            case 16 : this.hideProfile = false;
                     this.hideReport = false;
                     this.hideAdmin = false;
                     this.hideResource = false;
                     this.hideRevenue = false;
                    break;
            default : this.hideProfile = true;
                     this.hideReport = true;
                     this.hideAdmin = true;
                     this.hideResource = true;
                     this.hideRevenue = true;
        }
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

}
