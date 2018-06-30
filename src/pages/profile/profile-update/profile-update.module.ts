import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileUpdatePage } from './profile-update';
import { ElasticModule } from '../../../components/elastic-textarea/elastic-textarea.module';

@NgModule({
  declarations: [
    ProfileUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileUpdatePage),
    ElasticModule
  ],
})
export class ProfileUpdatePageModule {}
