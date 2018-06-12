import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
// import { ShrinkFabModule } from '../../../components/shrink-fab/shrink-fab.module';
import { SocialFeedPage } from './social-feed';

@NgModule({
  declarations: [
    SocialFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialFeedPage),
    TranslateModule.forChild(),
    // ShrinkFabModule
  ],
  exports: [
    SocialFeedPage
  ]
})
export class SocialFeedPageModule { }
