import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';
@Directive({
    selector: '[clicked]'
})
export class WindowClickedDirective {

    constructor(
        private renderer: Renderer,
        private el: ElementRef
    ){}

    @HostListener('click', ['$event']) onClick( $event ) {
      

    }
}
