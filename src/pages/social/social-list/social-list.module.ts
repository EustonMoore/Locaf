import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialListPage } from './social-list';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SocialListPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialListPage),
    PipesModule
  ],
})
export class SocialListPageModule {}
