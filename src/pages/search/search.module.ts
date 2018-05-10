import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ShrinkHeaderModule } from '../../components/shrink-header/shrink-header.module';
import { SearchPage } from './search';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    TranslateModule.forChild(),
    ShrinkHeaderModule
  ],
  exports: [
    SearchPage
  ]
})
export class SearchPageModule { }
