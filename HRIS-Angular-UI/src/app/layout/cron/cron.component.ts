import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-cron',
    templateUrl: './cron.component.html',
    styleUrls: ['./cron.component.scss'],
    animations: [routerTransition()]
})
export class CronComponent implements OnInit {

    constructor(
      private route: ActivatedRoute
    ) {

    }

    ngOnInit() {

    }

}
