import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, FabContainer, App, Slides, NavOptions, Platform } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { StorageProvider } from '../../../providers';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-social-grid',
  templateUrl: 'social-grid.html'
})
export class SocialGridPage {

  @ViewChild(Content) content: Content;
  @ViewChild('searchSlides') searchSlides: Slides
  @ViewChild("fab") fabHandler: FabContainer;

  halfHeight = this.platform.height() / 2;
  public cameraOptions: CameraOptions;
  public view = 'list';
  photos = [];

  currentItems: any = [];

  // options: ImagePickerOptions = {
  //   maximumImagesCount: 1,
  //   width: 600,
  //   height: 600,
  //   quality: 100
  // }


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public imagePicker: ImagePicker,
    public storage: StorageProvider,
    public platform: Platform,
    public camera: Camera) {

      this.cameraOptions = {
        quality: 100,
        targetWidth: 900,
        targetHeight: 900,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum : true,
        correctOrientation: true,
        allowEdit: true
      };

      
   }

  ionViewDidLoad(){
    this.searchSlides.onlyExternal= true;
    this.searchSlides.autoplayDisableOnInteraction = false;

    for(let i = 0; i< 30 ; i++){
      this.photos.push('assets/img/cafe.jpg')
    }
  }

 
  /**
   * Navigate to the detail page for this item.
   */
  
  openSocialSearchPage(keyword) {
    let options : NavOptions = {
      keyboardClose: false
    }

    if(keyword){
      this.app.getRootNavs()[0].push('SocialSearchPage', {
        keyword: keyword
       
      }, options);
    }

    else{
      this.app.getRootNavs()[0].push('SocialSearchPage', {}, options);
    }
    
    
  }

  openSocialCreatePage(select) {
    
    if(select == 'camera'){

      this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;
      this.camera.getPicture(this.cameraOptions).then(imageUri => {
        this.app.getRootNavs()[0].push('SocialCreatePage', {imageUri: imageUri});
      })

    }


    else if(select == 'gallery'){
      this.cameraOptions.sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
      this.camera.getPicture(this.cameraOptions).then(imageUri => {
        this.app.getRootNavs()[0].push('SocialCreatePage', {imageUri: imageUri});
      })
    }
    
    // this.app.getRootNavs()[0].push('SocialCreatePage', {
    //   item: item
     
    // });
    
  }

  openSocialListPage(){
    this.app.getRootNavs()[0].push('SocialListPage');
  }

  openNoticePage(){
    this.app.getRootNavs()[0].push('NoticePage', {
      from: 'social'
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      
      for(let i = 0; i< 30 ; i++){
        this.photos.push('assets/img/cafe.jpg')
      }
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }


}
