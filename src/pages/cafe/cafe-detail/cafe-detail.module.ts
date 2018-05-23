import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CafeDetailPage } from './cafe-detail';

@NgModule({
  declarations: [
    CafeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    CafeDetailPage
  ]
})
export class CafeDetailPageModule { }
