import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';


import { Cafe } from '../../../models';
import { FirestoreProvider } from '../../../providers';
import { Platform } from 'ionic-angular/platform/platform';
import { NavOptions } from 'ionic-angular/navigation/nav-util';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-cafe-detail',
  templateUrl: 'cafe-detail.html'
})
export class CafeDetailPage {
  public cafe: Cafe;
  public rate: any  ;
  public expanded: boolean = false;
  public feeds = [];
  public lastFeed;
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
              public actionSheetCtrl: ActionSheetController,
              public firestore: FirestoreProvider,
              public toastCtrl: ToastController,
              public platform: Platform,
              public camera: Camera
              ) {
    this.cafe = navParams.get('cafe');
    this.iconPath = "assets/icon/metro-Line-" + this.cafe.station.line + ".svg";
    
  
  }

  ionViewDidLoad() {
    
    console.log(this.cafe);
    
    this.firestore.getFeeds().ref.orderBy('date', 'desc').where('cafeId', '==', this.cafe.cafeId).limit(30).get().then(feeds => {
      this.feeds = [];
      this.lastFeed = feeds.docs[feeds.docs.length - 1];
      feeds.docs.forEach(doc => {
        this.feeds.push(doc.data());
      });
    });
   
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

presentActionSheet() {
  let options: NavOptions
        options = {
          animate: false
        
        }

  const cameraOptions: CameraOptions = {
    quality: 100,
    targetWidth: 640,
    targetHeight: 640,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    saveToPhotoAlbum : true,
    correctOrientation: true,
    allowEdit: true
  };     
  let actionSheet = this.actionSheetCtrl.create({
    
    buttons: [
      {
        
        text: '카메라',
        handler: () => {
          this.navCtrl.push('CameraPreviewPage', { cafe: this.cafe }, options);
          
        }
      },
      {
        text: '앨범',
        handler: () => {
          cameraOptions.sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
          this.camera.getPicture(cameraOptions).then(imageData => {
            console.log(imageData);
            this.navCtrl.push('CameraPreviewPage', {
              imageData: imageData,
              cafe: this.cafe 
            });
          });
        }
      },
      {
        text: '취소',
        role: 'cancel',
        handler: () => {
         
        }
      }
    ]
  });

  actionSheet.present();
}

}
