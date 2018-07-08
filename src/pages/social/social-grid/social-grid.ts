import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, FabContainer, App, Slides, NavOptions, Platform } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { FirestoreProvider } from '../../../providers';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';



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
  public view = 'list';
  public lastFeed;
  public loadMoreCheck: boolean = true;
  feeds = [];

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
    public firestore: FirestoreProvider,
    public platform: Platform,
    public camera: Camera) {

    

      
   }

  ionViewDidLoad(){
    this.searchSlides.onlyExternal= true;
    this.searchSlides.autoplayDisableOnInteraction = false;

    
    this.firestore.getFeeds().ref.orderBy('date', 'desc').limit(30).get().then(snapshot => {
      this.feeds = [];
      this.lastFeed = snapshot.docs[snapshot.docs.length - 1];
      this.loadMoreCheck = snapshot.docs.length == 30 ? true : false;
      snapshot.docs.forEach(doc => {
        this.feeds.push(doc.data());
      });
    });
    
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
      // this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;
      // this.camera.getPicture(this.cameraOptions).then(imageUri => {
      //   this.app.getRootNavs()[0].push('SocialCreatePage', {imageUri: imageUri});
      // })
      let options: NavOptions
      options = {
        animate: false
      }
      this.app.getRootNavs()[0].push('CameraPreviewPage', {}, options);
    }

    else if(select == 'gallery'){

      const cameraOptions: CameraOptions = {
        quality: 100,
        targetWidth: 640,
        targetHeight: 640,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum : true,
        correctOrientation: true,
        allowEdit: true
      };
      
      this.camera.getPicture(cameraOptions).then(imageData => {
        console.log(imageData);
        this.app.getRootNavs()[0].push('CameraPreviewPage', {
          imageData: imageData
        });
      })
    }
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
      this.firestore.getFeeds().ref.orderBy('date', 'desc').limit(30).startAfter(this.lastFeed).get().then(snapshot => {
        this.lastFeed = snapshot.docs[snapshot.docs.length - 1];
        this.loadMoreCheck = snapshot.docs.length == 30 ? true : false;
        snapshot.docs.forEach(doc => {
          this.feeds.push(doc.data());
          });
       });
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }


}
