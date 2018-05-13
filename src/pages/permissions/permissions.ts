import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';

import { PhotoLibrary } from '@ionic-native/photo-library';
/**
 * Generated class for the PermissionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-permissions',
  templateUrl: 'permissions.html',
})
export class PermissionsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private photoLibrary: PhotoLibrary, 
    private platform: Platform, 
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PermissionsPage');
  }

  tryRequestAuthorization() {

    this.platform.ready().then(() => {
      this.photoLibrary.requestAuthorization({read: true})
        .then(() => {
          this.navCtrl.pop();
        })
        .catch((err) => {
          let toast = this.toastCtrl.create({
            message: `requestAuthorization error: ${err}`,
            duration: 6000,
          });
          toast.present();
        });
    });

  }

}
