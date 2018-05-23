import { IonicModule } from 'ionic-angular';
import { ContentDrawer } from './content-drawer';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    ContentDrawer
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ContentDrawer
  ]
})
export class ContentDrawerModule {}