import { Component, Input, ElementRef, Renderer } from '@angular/core';
import { Platform, DomController } from 'ionic-angular';
 
@Component({
  selector: 'content-drawer',
  templateUrl: 'content-drawer.html'
})
export class ContentDrawer {
 
  @Input('options') options: any;
 
  handleHeight: number;
  bounceBack: boolean = true;
  thresholdTop: number = 200;
  thresholdBottom: number = 200;
  open: boolean = false;
 
  constructor(
    public element: ElementRef, 
    public renderer: Renderer, 
    public domCtrl: DomController, 
    public platform: Platform) {
 
  }
 
  ngAfterViewInit() {
    
    this.platform.is('ios') ? this.handleHeight = document.getElementsByClassName('toolbar')[2].clientHeight : this.handleHeight = document.getElementsByClassName('toolbar')[0].clientHeight;
    // if(this.options.handleHeight){
    //   this.handleHeight = this.options.handleHeight;
    // }
 
    if(this.options.bounceBack){
      this.bounceBack = this.options.bounceBack;
    }
 
    if(this.options.thresholdFromBottom){
      this.thresholdBottom = this.options.thresholdFromBottom;
    }
 
    if(this.options.thresholdFromTop){
      this.thresholdTop = this.options.thresholdFromTop;
    }
 
    this.renderer.setElementStyle(this.element.nativeElement, 'top', this.platform.height() - this.handleHeight + 'px');
    this.renderer.setElementStyle(this.element.nativeElement, 'padding-top', this.handleHeight + 'px');
 
 
    let hammer = new window['Hammer'](this.element.nativeElement.children[0]);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });
 
    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });
 
  }

  handlePan(ev){
 
    let newTop = ev.center.y;
 
    let bounceToBottom = false;
    let bounceToTop = false;
 
    if(this.bounceBack && ev.isFinal){
 
      let topDiff = newTop - this.thresholdTop;
      let bottomDiff = (this.platform.height() - this.thresholdBottom) - newTop;     
 
      topDiff >= bottomDiff ? bounceToBottom = true : bounceToTop = true;
 
    }
 
    if((newTop < this.thresholdTop && ev.additionalEvent === "panup") || bounceToTop){
 
      this.domCtrl.write(() => {
        this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top 0.3s');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', 60 + '%');
       
      });
      this.open = true;
      console.log(this.open)
 
    } else if(((this.platform.height() - newTop) < this.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom){
 
      this.domCtrl.write(() => {
        this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top 0.3s');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.platform.height() - this.handleHeight + 'px');
        
      });
      this.open = false;
      console.log(this.open)
 
    } else {
      
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'none');
 
      if(newTop > 0 && newTop < (this.platform.height() - this.handleHeight)) {
 
        if(ev.additionalEvent === "panup" || ev.additionalEvent === "pandown"){
 
          this.domCtrl.write(() => {
            this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
          });
 
        }
 
      }
 
    }
 
  }
 

 
  showContent(){
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top 0.3s');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', 60 + '%');
    });
  }

  hideContent(){
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top 0.3s');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', this.platform.height() - this.handleHeight + 'px');
      
    });
  }
}