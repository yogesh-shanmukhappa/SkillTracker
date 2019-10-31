import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';


import { SkilltrackerRoutingModule } from './skilltracker-routing.module';
import { SkilltrackerComponent } from './skilltracker.component';

import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        SkilltrackerRoutingModule,
        StatModule,
        FormsModule
    ],
    declarations: [
        SkilltrackerComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SkilltrackerModule { }
