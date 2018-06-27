import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-profile',
  templateUrl: 'profile-detail.html',
})
export class ProfilePage {

  user;
  myProfile = false;
  photos = [];
  segmentView = 'feed';
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
    this.user = navParams.get('user');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    if(!this.user){
      this.myProfile = true;
      this.user = this.auth.getUserData();
    }
    for(let i = 0; i< 30 ; i++){
      this.photos.push('assets/img/cafe.jpg')
    }

    console.log(this.photos);
  }




}
