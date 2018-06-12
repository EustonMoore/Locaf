import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialSearchPage } from './social-search';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SocialSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialSearchPage),
    TranslateModule.forChild()
  ],
})
export class SocialSearchPageModule {}
