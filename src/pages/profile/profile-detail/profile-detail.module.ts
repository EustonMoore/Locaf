import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile-detail';
import { ParallaxHeaderModule } from '../../../components/parallax-header/parallax-header.module'

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ParallaxHeaderModule
  ],
})
export class ProfilePageModule {}
