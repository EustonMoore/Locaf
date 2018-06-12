import { IonicModule } from 'ionic-angular';
import { ExpandableListComponent } from './expandable-list';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    ExpandableListComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ExpandableListComponent
  ]
})
export class ExpandableListComponentModule {}