import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {  Compiler } from '@angular/core';
import { CommonDataStreamService, Globals } from './shared';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private translate: TranslateService,
        private commonDataStreamService: CommonDataStreamService,
        private globals: Globals,
        private _compiler: Compiler
    ) {
        translate.addLangs(['en', 'fr', 'ur', 'es']);
        translate.setDefaultLang('en');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr|ur|es/) ? browserLang : 'en');
        this._compiler.clearCache();
    }

    ngOnInit() {

    }


}
