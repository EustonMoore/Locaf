import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LoginModalPage } from './login-modal';

@NgModule({
  declarations: [
    LoginModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginModalPage),
  ],
})
export class LoginModalPageModule {}
