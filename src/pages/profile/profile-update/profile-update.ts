import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfileUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
})
export class ProfileUpdatePage {

  private user;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.data;
  }

  ionViewDidLoad() {
    console.log(this.user);
    console.log('ionViewDidLoad ProfileUpdatePage');

    window.addEventListener('keyboardWillShow', (event) => {
      
    })
  }

}
