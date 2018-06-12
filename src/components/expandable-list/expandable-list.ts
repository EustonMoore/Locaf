import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
 
@Component({
  selector: 'expandable-list',
  templateUrl: 'expandable-list.html'
})
export class ExpandableListComponent {
 
    @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
    @Input('expanded') expanded;
    @Input('expandHeight') expandHeight;
    @Input('mode') mode;
 
    constructor(public renderer: Renderer) {
 
    }
 
    ngAfterViewInit(){
        if(this.mode == 'map') this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight + 'px');
        else this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', 'auto');
    }
 
}