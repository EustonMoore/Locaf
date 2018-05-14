import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ModalController } from 'ionic-angular';


/**
 * Generated class for the SocialCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const THUMBNAIL_WIDTH = 512;
const THUMBNAIL_HEIGHT = 384;

@IonicPage()
@Component({
  selector: 'page-social-create',
  templateUrl: 'social-create.html',
})
export class SocialCreatePage {

  thumbnailWidth = THUMBNAIL_WIDTH + 'px';
  thumbnailHeight = THUMBNAIL_HEIGHT + 'px';


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    
    private platform: Platform, 
    private cd: ChangeDetectorRef,
    private toastCtrl: ToastController, 
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialCreatePage');
   
    
  }


 

}
