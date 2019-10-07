import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { Globals } from '../global'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private globals: Globals
    ) { }

    canActivate() {
        if ( this.globals.getLoginStatus() ) {
            return true;
        }

        this.router.navigate(['/dashboard']);
        return false;
    }
}
