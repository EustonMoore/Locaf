import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ShrinkHeaderModule } from '../../components/shrink-header/shrink-header.module';
import { ShrinkFabModule } from '../../components/shrink-fab/shrink-fab.module';
import { CafeListPage } from './cafe-list';

@NgModule({
  declarations: [
    CafeListPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeListPage),
    TranslateModule.forChild(),
    ShrinkHeaderModule,
    ShrinkFabModule
  ],
  exports: [
    CafeListPage,
  ]
})
export class CafeListPageModule { }
