import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
// import { ShrinkFabModule } from '../../components/shrink-fab/shrink-fab.module';
import { CafeListPage } from './cafe-list';
// import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    CafeListPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeListPage),
    TranslateModule.forChild(),
    // IonicImageLoader
    // ShrinkFabModule
  ],
  exports: [
    CafeListPage,
  ]
})
export class CafeListPageModule { }
