import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialCreatePage } from './social-create';
import { PipesModule } from '../../../pipes/pipes.module'

@NgModule({
  declarations: [
    SocialCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(SocialCreatePage),
    PipesModule
  ],
})
export class SocialCreatePageModule {}
