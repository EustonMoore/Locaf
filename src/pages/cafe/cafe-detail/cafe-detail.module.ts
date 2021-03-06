import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpandableListComponentModule } from '../../../components/expandable-list/expandable-list.module'
import { CafeDetailPage } from './cafe-detail';

@NgModule({
  declarations: [
    CafeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeDetailPage),
    TranslateModule.forChild(),
    ExpandableListComponentModule
  ],
  exports: [
    CafeDetailPage
  ]
})
export class CafeDetailPageModule { }
