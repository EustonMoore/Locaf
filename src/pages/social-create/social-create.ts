import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ModalController, Gesture } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

/**
 * Generated class for the SocialCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const THUMBNAIL_WIDTH = 512;
const THUMBNAIL_HEIGHT = 384;

const cameraPreviewOpts: CameraPreviewOptions = {
  x: 0,
  y: 0,
  width: window.screen.width,
  height: window.screen.width,
  camera: 'rear',
  toBack: true,
  tapToFocus: true,
  tapPhoto: false,
  alpha: 1
};

@IonicPage()
@Component({
  selector: 'page-social-create',
  templateUrl: 'social-create.html',
})


export class SocialCreatePage {

  thumbnailWidth = THUMBNAIL_WIDTH + 'px';
  thumbnailHeight = THUMBNAIL_HEIGHT + 'px';
  private gesture: Gesture;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private cameraPreview: CameraPreview,
    private platform: Platform, 
    private cd: ChangeDetectorRef,
    private toastCtrl: ToastController, 
    private modalCtrl: ModalController) {

      
       
        
     
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialCreatePage');
    cameraPreviewOpts.y = document.getElementsByClassName('header_camera')[0].clientHeight;
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        
        console.log(res)

        // let pinchArea = <HTMLAnchorElement> document.querySelector('#pinchArea');
        // pinchArea.style.width = window.screen.width + 'px';
        // pinchArea.style.height = window.screen.width + 'px';


        // this.gesture = new Gesture(this.element.nativeElement);
        // this.gesture.listen();
        // this.gesture.on('pinchstart', (e) => {
        //   console.log('pinchstart event');
        // });
    
        // // ... for the pinch event
        // this.gesture.on('pinch', (e) => {
        //   console.log(e.scale);
        // });
    
        // // ... for the pinchend event
        // this.gesture.on('pinchend', (e) => {
        //   console.log('pinchend event')
        // });
        
      },
      (err) => {
        console.log(err)
      });
      this.cameraPreview.show();
    
    
  }


  takePicture(){
    this.cameraPreview.getSupportedPictureSizes().then(
      (res) => {
        console.log(res);
      }, 
      (rej) => {
        console.log(rej);
      })
  }

  ionViewWillLeave(){
    this.cameraPreview.stopCamera();
  }


 

}
