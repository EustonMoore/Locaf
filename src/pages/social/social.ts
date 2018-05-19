import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, FabContainer, App } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Item } from '../../models/item';
import { Items, StorageProvider } from '../../providers';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html'
})
export class SocialPage {

  @ViewChild(Content) content: Content;
  @ViewChild("fab") fabHandler: FabContainer;

  public cameraOptions: CameraOptions;
  public view = 'list';

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
    public items: Items,
    public imagePicker: ImagePicker,
    public storage: StorageProvider,
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

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  
  openSocialSearchPage(item: Item) {
    
    this.app.getRootNavs()[0].push('SocialSearchPage', {
      item: item
     
    });
    
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

  // Convert fileURI to Blob.
 


}
