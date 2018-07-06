import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


import { Cafe } from '../../../models';
import { FirestoreProvider } from '../../../providers';
import { Platform } from 'ionic-angular/platform/platform';

@IonicPage()
@Component({
  selector: 'page-cafe-detail',
  templateUrl: 'cafe-detail.html'
})
export class CafeDetailPage {
  cafe: Cafe;
  rate: any  ;
  expanded: boolean = false;
  itemExpandHeight: number = this.platform.height() / 3;
  //*********** Variables for fading header **************//
  showToolbar:boolean = false;
  transition:boolean = false;
  iconPath: string;
  // headerImgSize:string = '100%';
  // headerImgUrl:string = '';
  //****************************//



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public ref: ChangeDetectorRef,
              public firestore: FirestoreProvider,
              public toastCtrl: ToastController,
              public platform: Platform
              ) {
    this.cafe = navParams.get('cafe');
    this.iconPath = "assets/icon/metro-Line-" + this.cafe.station.line + ".svg";
    
  
  }

  ionViewDidLoad() {
    
    console.log(this.cafe);
   
  }

 //*********** Fading header  **************/
  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 150;
    if(scrollTop < 0){
        this.transition = false;
        //this.headerImgSize = `${ Math.abs(scrollTop)/2 + 100}%`;
    }else{
        this.transition = true;
       // this.headerImgSize = '100%'
    }
    this.ref.detectChanges();
}

addToFav(cafe) {
  cafe.favorite = !cafe.favorite;
  this.presentToast('bottom','Add to Favorite');
}


presentToast(position: string,message: string) {
  let toast = this.toastCtrl.create({
    message: message,
    position: position,
    duration: 1000
  });
toast.onDidDismiss(this.dismissHandler);
toast.present();
}

private dismissHandler() {
  console.info('Toast onDidDismiss()');
}

expandItem(){
  console.log(this.expanded)
  this.expanded = !this.expanded;

}


}
