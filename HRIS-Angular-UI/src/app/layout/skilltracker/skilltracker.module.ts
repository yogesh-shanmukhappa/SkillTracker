import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbCarouselModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { SkilltrackerService } from '../../provider/skilltracker/skilltracker.service'
import { SkilltrackerRoutingModule } from './skilltracker-routing.module';
import { SkilltrackerComponent } from './skilltracker.component';
import { StatModule } from '../../shared';
import { BrowserModule } from '@angular/platform-browser';
//import { HighchartsChartComponent  } from 'highcharts-angular';


// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';
 
// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
 
// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        SkilltrackerRoutingModule,
        StatModule,
        FormsModule, ReactiveFormsModule,
        FusionChartsModule
        //ChartModule
    ],
    declarations: [
        SkilltrackerComponent,
        //HighchartsChartComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [SkilltrackerService]
})
export class SkilltrackerModule { }
