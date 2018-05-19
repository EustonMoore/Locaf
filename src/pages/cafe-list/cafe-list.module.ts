import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ShrinkFabModule } from '../../components/shrink-fab/shrink-fab.module';
import { CafeListPage } from './cafe-list';

@NgModule({
  declarations: [
    CafeListPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeListPage),
    TranslateModule.forChild(),
    ShrinkFabModule
  ],
  exports: [
    CafeListPage,
  ]
})
export class CafeListPageModule { }
