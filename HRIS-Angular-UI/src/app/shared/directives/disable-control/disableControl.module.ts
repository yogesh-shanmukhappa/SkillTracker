import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DisableControlDirective } from './disableControl';
import { FormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        NgbModule.forRoot()
    ],
    declarations: [
        DisableControlDirective
    ],
    exports: [
        DisableControlDirective
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DisableControlModule { }
