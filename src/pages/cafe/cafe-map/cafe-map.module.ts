import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CafeMapPage } from './cafe-map';
import { ContentDrawerModule } from '../../../components/content-drawer/content-drawer.module'



@NgModule({
  declarations: [
    CafeMapPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeMapPage),
    ContentDrawerModule
  ],
})
export class CafeMapPagePageModule {}
