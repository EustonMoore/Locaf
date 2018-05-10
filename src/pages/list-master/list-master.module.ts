import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ShrinkHeaderModule } from '../../components/shrink-header/shrink-header.module';
import { ListMasterPage } from './list-master';

@NgModule({
  declarations: [
    ListMasterPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMasterPage),
    TranslateModule.forChild(),
    ShrinkHeaderModule
  ],
  exports: [
    ListMasterPage,
  ]
})
export class ListMasterPageModule { }
