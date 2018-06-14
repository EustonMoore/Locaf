import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
// import { ShrinkFabModule } from '../../../components/shrink-fab/shrink-fab.module';
import { SocialGridPage } from './social-grid';

@NgModule({
  declarations: [
    SocialGridPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialGridPage),
    TranslateModule.forChild(),
    // ShrinkFabModule
  ],
  exports: [
    SocialGridPage
  ]
})
export class SocialGridPageModule { }
