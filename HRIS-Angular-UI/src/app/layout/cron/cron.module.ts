import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CronRoutingModule } from './cron-routing.module';
import { CronComponent } from './cron.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    imports: [
        CommonModule,
        CronRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NgbModule.forRoot()
    ],
    declarations: [
        CronComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CronModule { }
