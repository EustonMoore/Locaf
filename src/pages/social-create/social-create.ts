import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ModalController, Gesture } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry } from '@ionic-native/file';
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

const cameraOpts: CameraPreviewPictureOptions = {
  width: window.screen.width,
  height: window.screen.width,
  quality: 85
}


@IonicPage()
@Component({
  selector: 'page-social-create',
  templateUrl: 'social-create.html',
})


export class SocialCreatePage {

  thumbnailWidth = THUMBNAIL_WIDTH + 'px';
  thumbnailHeight = THUMBNAIL_HEIGHT + 'px';
  private gesture: Gesture;
  public takedPicture;
  public profilePhoto: CameraOptions;
  
 


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private cameraPreview: CameraPreview,
    private platform: Platform, 
    private cd: ChangeDetectorRef,
    private toastCtrl: ToastController, 
    private modalCtrl: ModalController,
    private file: File,
    private camera: Camera,
    ) {

    this.takedPicture = "data:image/jpeg;base64," + navParams.get('imageUri');
    
        
     
  }

 


  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialCreatePage');
    cameraPreviewOpts.y = document.getElementsByClassName('header_camera')[0].clientHeight;
    let imgBlob = this.imgURItoBlob(this.takedPicture)
    console.log(imgBlob);

    // this.cameraPreview.startCamera(cameraPreviewOpts).then(
    //   (res) => {
        
    //     console.log(res)

    //     // let pinchArea = <HTMLAnchorElement> document.querySelector('#pinchArea');
    //     // pinchArea.style.width = window.screen.width + 'px';
    //     // pinchArea.style.height = window.screen.width + 'px';


    //     // this.gesture = new Gesture(this.element.nativeElement);
    //     // this.gesture.listen();
    //     // this.gesture.on('pinchstart', (e) => {
    //     //   console.log('pinchstart event');
    //     // });
    
    //     // // ... for the pinch event
    //     // this.gesture.on('pinch', (e) => {
    //     //   console.log(e.scale);
    //     // });
    
    //     // // ... for the pinchend event
    //     // this.gesture.on('pinchend', (e) => {
    //     //   console.log('pinchend event')
    //     // });
        
    //   },
    //   (err) => {
    //     console.log(err)
    //   });
    //   this.cameraPreview.show();
    
    
  }

  takePicture(){
   
  }

  ionViewWillLeave(){
    this.cameraPreview.stopCamera();
  }


  imgURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  }


 

}
