import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, ViewController, Toast, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { AuthProvider, ToastProvider, TranslateProvider, LoadingProvider } from '../../../providers';


/**
 * Generated class for the LoginModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {
  @ViewChild('myInput') myInput;

  private type : any;
  private loginForm: FormGroup;
  private registerForm: FormGroup;
  private hasError: boolean;
  private title: string;
  private contentBox: any;

  private emailValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.email,
    Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
  ]);
  private passwordValidator: ValidatorFn = Validators.compose([
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')
  ]);

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public auth: AuthProvider,
              public loading: LoadingProvider, 
              public toast: ToastProvider,
              public translate: TranslateProvider,
              public formBuilder: FormBuilder, 
              public viewCtrl: ViewController,
              public app: App) {
                this.type = this.navParams.get('type');
                console.log(this.type)
                if(this.type == 'login'){
                  this.title = '로그인';
                }
                else{
                  this.title = '회원가입';
                }

                this.loginForm = formBuilder.group({
                  email: ['', this.emailValidator],
                  password: ['', this.passwordValidator]
                });
              
                this.registerForm = formBuilder.group({
                  email: ['', this.emailValidator],
                  password: ['', this.passwordValidator],
                  confirmPassword: ['', this.passwordValidator]
                });
               
              
  }


  ionViewDidLoad() {
   
    console.log('ionViewDidLoad LoginModalPage');
    this.myInput.setFocus();
  }

  private login(): void {
    // Login using Email and Password.
    if (!this.loginForm.valid) {
      this.hasError = true;
    } else {
      this.loading.show();
      this.auth.loginWithEmail(this.loginForm.value['email'], this.loginForm.value['password']).then(res => {
        this.loading.hide();
        this.viewCtrl.dismiss({data: true});
      }).catch(err => {
        this.toast.show(this.translate.get(err.code));
        this.loading.hide();
      });
    }
  }

  private loginWithFacebook(): void {
    // Login using Facebook.
    this.loading.show();
    this.auth.loginWithFacebook().then(res => {
      console.log(res);
      this.loading.hide();
      this.viewCtrl.dismiss({data: true});
    }).catch(err => {
      this.toast.show(err);
      this.loading.hide();
    });
  }

  private register(): void {
    // Register with Email and Password.
    if (!this.registerForm.valid || this.registerForm.value['password'] != this.registerForm.value['confirmPassword']) {
      this.hasError = true;
    } else {
      this.loading.show();
      this.auth.registerWithEmail(this.registerForm.value['email'], this.registerForm.value['password']).then(res => {
        this.loading.hide();
        this.viewCtrl.dismiss({data: true});
      }).catch(err => {
        this.toast.show(this.translate.get(err.code));
        this.loading.hide();
      });
    }
  }
}
