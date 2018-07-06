import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Thumbnail } from 'ionic-angular';
import { CameraPreviewOptions, CameraPreview, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { Platform } from 'ionic-angular/platform/platform';
import { take } from 'rxjs/operator/take';

/**
 * Generated class for the CameraPreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera-preview',
  templateUrl: 'camera-preview.html',
})
export class CameraPreviewPage {
  
  public cameraPreviewOpts: CameraPreviewOptions;
  public cameraOpts: CameraPreviewPictureOptions;
  public maxZoomLevel: number;
  public brightLevel: number;
  public minExposure: number;
  public maxExposure: number;
  public footerHeight: number;
  public filterLevel: number;
  public editMode: boolean = false;


  public filter = [{name: 'Original', filter: null, src: null, range: null, imageData: null},
  {name: 'Sepia', filter: 'SEPIA', src: null, range: null, imageData: null},
  {name: 'Brightness', filter: 'BRIGHTNESS', src: null, imageData: null},
  {name: 'Saturation', filter: 'SATURATION', src: null, imageData: null},
  {name: 'Contrast', filter: 'CONTRAST', src: null, imageData: null},
  {name: 'HUE', filter: 'HUE', src: null, imageData: null},
  {name: 'Blue Monotone', filter: 'BLUE_MONOTONE',  src: null, imageData: null},
  {name: 'Violen Tomato', filter: 'VIOLEN_TOMATO',  src: null, imageData: null},
  {name: 'Greyscale', filter: 'GREYSCALE', src: null, imageData: null},
 
  {name: 'Cookie', filter: 'COOKIE', src: null, imageData: null},
  {name: 'Vintage', filter: 'VINTAGE', src: null, imageData: null},
  {name: 'Koda', filter: 'KODA', src: null, imageData: null},
  {name: 'Technicolor', filter: 'TECHNICOLOR', src: null, imageData: null},
  {name: 'Polaroid', filter: 'POLAROID', src: null, imageData: null},
  {name: 'BGR', filter: 'BGR', src: null, imageData: null}]

  public selectedFilter = {
    imageData: null,
    filter: this.filter[0].filter
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private cameraPreview: CameraPreview,
              private platform: Platform) {

            
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPreviewPage');

    this.footerHeight = this.platform.width() + document.getElementsByClassName('camera-header')[0].clientHeight;
    
    this.selectedFilter.imageData = this.navParams.get('imageData');
    if(this.selectedFilter.imageData){
      let takedPicture = document.getElementById('originalPicture') as HTMLImageElement;
      takedPicture.src = 'data:image/jpeg;base64,' + this.selectedFilter.imageData;
      
      this.resizeImage(this.selectedFilter.imageData, null, 320).then(resizedBase64 => {
        this.filter.forEach((filter) => {
          filter.src = resizedBase64[0];
        })
        this.editMode = true;
      })
      
     
    }
  
    else this.initCamera();
    

  
   

   
    
    

    
    // this.cameraPreview.show();      
  }
  

  initCamera(){

    this.cameraPreviewOpts = {
      x: 0,
      y: document.getElementsByClassName('camera-header')[0].clientHeight,
      width: window.screen.width,
      height: window.screen.width,
      camera: 'rear',
      toBack: true,
      tapToFocus: true,
      tapPhoto: false,
      alpha: 1
    };
    
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        this.cameraPreview.getSupportedPictureSizes().then(dimensions => {
          dimensions.sort((a,b) => {
            return (b.witdh * b.height - a.width * a.height);
          })
          let dimen = dimensions[dimensions.length - 1];
          this.cameraOpts = {
            width: dimen.width,
            height: dimen.width,
            quality: 50
          };
        })
        // this.cameraPreview.getMaxZoom().then(maxZoom => {
        //   console.log(maxZoom);
        //   this.maxZoomLevel = maxZoom;
        // });
    
        this.cameraPreview.getExposureCompensation().then(exposureLevel => {
          this.brightLevel = exposureLevel;
        })
    
        this.cameraPreview.getExposureCompensationRange().then(exposureRange => {
          this.minExposure = exposureRange.min;
          this.maxExposure = exposureRange.max;
        })
        
        this.cameraPreview.onBackButton().then(event => {
          
          this.navCtrl.pop();
        });
      },
      (err) => {
        console.log(err)
      });
  }
  
  ionViewWillLeave(){
    this.cameraPreview.stopCamera();
  }


  takePicture(){
    this.cameraPreview.takePicture(this.cameraOpts).then(imageData => {
      let takedPicture = document.getElementById('originalPicture') as HTMLImageElement;
           
      this.resizeImage(imageData, 1024, 320).then(resizedBase64 => {
        takedPicture.src = resizedBase64[0];
        this.filter.forEach((filter, index) => {
          filter.src = resizedBase64[1];
        })
        // this.navCtrl.push('SocialCreatePage', {imageData: resizedData});
        this.cameraPreview.hide();
        this.selectedFilter.imageData = takedPicture.src.split(',')[1];
        this.editMode = true;
      });
    })
  }

  resizeImage(imageData, regular?, thumbnail?){
    return new Promise(resolve => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      
      let img = new Image();
      img.onload = ()=> {
        let result = []
        if(regular) {
          canvas.width = regular;
          canvas.height = regular;
          ctx.drawImage(img, 0, 0, regular, regular);
          result.push(canvas.toDataURL('image/jpeg'));
        }
        canvas.width = thumbnail;
        canvas.height = thumbnail;
        ctx.drawImage(img, 0, 0, thumbnail, thumbnail);
        result.push(canvas.toDataURL('image/jpeg'));
        img.remove();
        resolve(result);
      }
      img.src = 'data:image/jpeg;base64,'+ imageData;
    })
  }

  changeFilter(item){
    
    let takedPicture = document.getElementById('originalPicture') as HTMLImageElement;
    
    this.selectedFilter.filter = item.filter;
    if(item.filter == null && takedPicture.firstElementChild.tagName == 'CANVAS') {
      this.selectedFilter.imageData = takedPicture.src.split(',')[1];
      takedPicture.firstElementChild.remove();
    }
    
  }
  swipe(event){
    console.log(event);
  }

  imageLoaded(event){
    if(this.selectedFilter.filter != null) this.selectedFilter.imageData = event.detail.result.toDataURL('image/jpeg').split(',')[1];
  }

  filterLoaded(event, item){
    if(item.filter != null) {
      item.imageData = event.detail.result.toDataURL('image/jpeg');
      event.detail.result.remove();
    }
  }

  openSocialCreatePage(){
    this.navCtrl.push('SocialCreatePage', {imageData: this.selectedFilter.imageData});
  }
}
