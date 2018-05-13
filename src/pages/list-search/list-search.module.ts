import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListSearchPage } from './list-search';

@NgModule({
  declarations: [
    ListSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ListSearchPage),
  ],
})
export class ListSearchPageModule {}
