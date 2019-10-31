import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent, WindowClickedDirective } from '../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        WindowClickedDirective
    ],
    exports: [
        LayoutComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LayoutModule {}
