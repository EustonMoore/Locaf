import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ModalController, MenuController } from 'ionic-angular';
import { AuthProvider, LoadingProvider, ToastProvider, TranslateProvider } from '../../../providers';

import { User } from '../../../providers';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;
  public showButtons = true;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    private auth: AuthProvider,
    private loading: LoadingProvider,
    private toast: ToastProvider) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }


  ionviewDidLoad(){
    this.menuCtrl.enable(false);
  }

  login(){
    this.showButtons = false;
    let options = {
      showBackdrop: true,
      enableBackdropDismiss: true,
      cssClass:'modal-login'
    }

    let modal = this.modalCtrl.create('LoginModalPage', { type: 'login'}, options);
    modal.onDidDismiss(data => {
      this.showButtons = true;
      if(data){

      }
    })

    modal.present();
  }

  
  register(){
    this.showButtons = false;
    let options = {
      showBackdrop: true,
      enableBackdropDismiss: true,
      cssClass:'modal-register'
    }

    let modal = this.modalCtrl.create('LoginModalPage', { type: 'register'}, options);
    modal.onDidDismiss(data => {
      this.showButtons = true;
      if(data){
        
      }
    })
    modal.present();
  }
  

  private loginWithFacebook(): void {
    // Login using Facebook.
    this.loading.show();
    this.auth.loginWithFacebook().then(res => {
      this.loading.hide();
      this.navCtrl.setRoot('LoaderPage');
    }).catch(err => {
      this.toast.show(err);
      this.loading.hide();
    });
  }
  
}
