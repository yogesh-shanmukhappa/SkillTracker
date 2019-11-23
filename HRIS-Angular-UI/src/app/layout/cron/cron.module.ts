import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { CronService } from '../../provider/cron/cron.service'
import { CronRoutingModule } from './cron-routing.module';
import { CronComponent } from './cron.component';
import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        CronRoutingModule,
        StatModule,
        FormsModule, ReactiveFormsModule        
    ],
    declarations: [
        CronComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [CronService]
})
export class CronModule { }
