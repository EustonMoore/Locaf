import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialListPage } from './social-list';

@NgModule({
  declarations: [
    SocialListPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialListPage),
  ],
})
export class SocialListPageModule {}
