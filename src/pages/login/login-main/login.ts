import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ModalController, ModalOptions } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { AuthProvider, LoadingProvider, ToastProvider, TranslateProvider, FirestoreProvider } from '../../../providers';
import { User } from '../../../models';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
 
  public showButtons = true;
  private userId: string;
  private profileForm: FormGroup;
  private photo: string = 'assets/imag/noavatar.png';

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private translateService: TranslateService,
    private modalCtrl: ModalController,
    private auth: AuthProvider,
    private loading: LoadingProvider,
    private toast: ToastProvider,
    private firestore: FirestoreProvider
  ) {

   
  }


  ionviewDidLoad(){
    
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
        this.navCtrl.setRoot('TabsPage');
      }
    })

    modal.present({
      keyboardClose: false
    });
  }

  test(){
    this.navCtrl.setRoot('TabsPage');
  }

  
  register(){
    this.showButtons = false;
    let options: ModalOptions = {
      showBackdrop: true,
      enableBackdropDismiss: true,
      cssClass:'modal-register'
    }

    let modal = this.modalCtrl.create('LoginModalPage', { type: 'register'}, options);
    modal.onDidDismiss(data => {
      this.showButtons = true;
      if(data){
        this.createProfile();
        this.navCtrl.setRoot('TabsPage');
      }
    })
    modal.present({
      keyboardClose: false
    });
  }
  

  private loginWithFacebook(): void {
    // Login using Facebook.
    this.loading.show();
    this.auth.loginWithFacebook().then(res => {
      this.loading.hide();
      this.createProfile();
      this.navCtrl.setRoot('TabsPage');
    }).catch(err => {
      this.toast.show(err);
      this.loading.hide();
    });
  }


  private loginWithKakao(): void {
    
    this.auth.loginWithKakao().then(res => {
      console.log(res);
      this.loading.hide()
    }).catch(err => {
      console.log(err)
      this.toast.show(err);
      this.loading.hide();
    })
  }


  private createProfile(): void {
    this.loading.show();

      this.auth.getUser().then((user: firebase.User) => {
        this.userId = user.uid;
          if (user.photoURL) {
            this.photo = user.photoURL;
          }
          let idx = user.email.indexOf("@");
          let username = user.email.substring(0, idx);
          
            // Create userData on Firestore.
          this.firestore.get('users/' + this.userId).then(ref => {
          // Formatting the first and last names to capitalized.
          
          let newUser = new User(this.userId, user.email.toLowerCase(),this.photo, username, null, null, null, null, '', true, null);
        
          ref.set(newUser.object).then(() => {
            //this.notification.init();
            this.loading.hide();
            this.navCtrl.setRoot('TabsPage');
          }).catch(() => { });
        }).catch(() => { });

      }).catch(() => { });


    }
  
}
