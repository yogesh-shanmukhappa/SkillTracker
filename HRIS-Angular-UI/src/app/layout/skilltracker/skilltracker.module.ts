import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { SkilltrackerService } from '../../provider/skilltracker/skilltracker.service'
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
        FormsModule, ReactiveFormsModule
    ],
    declarations: [
        SkilltrackerComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [SkilltrackerService]
})
export class SkilltrackerModule { }
