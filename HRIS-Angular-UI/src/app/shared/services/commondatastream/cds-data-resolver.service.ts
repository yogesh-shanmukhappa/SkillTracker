import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { CommonDataStreamService }  from './commondatastream.service';
import { Globals } from '../../global';

@Injectable()
export class CDSDataResolver implements Resolve<any> {
  constructor(
    private cds: CommonDataStreamService,
    private router: Router,
    private globals: Globals,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

    return this.cds.commonDataStream().then( data => {

      if ( data ) {

      } else {

        this.router.navigate(['/login']);
        return null;

      }

    });

  }
}
