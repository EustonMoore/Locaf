import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ShrinkFabModule } from '../../components/shrink-fab/shrink-fab.module';
import { ShrinkHeaderModule } from '../../components/shrink-header/shrink-header.module';
import { SocialPage } from './social';

@NgModule({
  declarations: [
    SocialPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialPage),
    TranslateModule.forChild(),
    ShrinkHeaderModule,
    ShrinkFabModule
  ],
  exports: [
    SocialPage
  ]
})
export class SocialPageModule { }
