
import { Directive,ElementRef,Renderer,Input,ViewChild} from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';

@Directive({
    selector: '[shrink-header]',
    host: {
        '(ionScroll)': 'onContentScroll($event)'
    }
})
export class ShrinkHeader {
    @Input() headerToHide:string;   
  
    header: any;
    headerStart:any;
    contentBox: any;
    headerHeight: any;
    translateAmt: any;
    scrollPosition: number = 0;
    lastScrollTop: number = 0;
    activePage: any;

    constructor(public elementRef: ElementRef, public renderer: Renderer, public navCtrl: NavController) {}
    ngOnInit(){
        this.contentBox =  this.elementRef.nativeElement.getElementsByClassName('scroll-content')[0];
        this.renderer.setElementStyle(this.contentBox, 'margin-top','0px !important');
        this.renderer.setElementStyle(this.contentBox, 'padding-top','0px !important' );

    }

    ngAfterViewInit() {
        console.log(" [headerToHide]="+this.headerToHide);
        this.header = document.getElementsByClassName(this.headerToHide)[0];
        this.headerHeight = this.header.clientHeight;

        
        window.addEventListener('keyboardWillShow', (ev) => {
            // Describe your logic which will be run each time when keyboard is about to be shown.
            console.log('sdfsdf');
            this.hideFooter();
        });
      
        window.addEventListener('keyboardWillHide', () => {
          // Describe your logic which will be run each time when keyboard is about to be closed.
          console.log('sdfsdf22');
          this.showFooter();
        });


    }


    
    onContentScroll(ev) {
        ev.domWrite(() => {
            this.updateHeader(ev);
        });   
    }

    updateHeader(ev) {
        this.scrollPosition = ev.scrollTop;
        if (this.scrollPosition > this.lastScrollTop && this.scrollPosition >= 25) {
            // scrolling down
            this.hideFooter();
          
        } else {
            // scrolling up
            this.showFooter();
        }
        // reset
        this.lastScrollTop = this.scrollPosition;
    }

    hideFooter(){
        this.renderer.setElementStyle(this.header, 'transform', 'translateY(' + this.headerHeight + 'px)');
    }

    showFooter(){

        this.renderer.setElementStyle(this.header, 'transition', 'all 0.2s linear');
        this.renderer.setElementStyle(this.header, 'transform', 'translateY(0px)');
    }

    

}