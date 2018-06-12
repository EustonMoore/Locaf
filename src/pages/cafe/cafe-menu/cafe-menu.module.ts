import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CafeMenuPage } from './cafe-menu';
import { ExpandableListComponentModule } from '../../../components/expandable-list/expandable-list.module'

@NgModule({
  declarations: [
    CafeMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeMenuPage),
    ExpandableListComponentModule
  ],
})
export class CafeMenuPageModule {}
