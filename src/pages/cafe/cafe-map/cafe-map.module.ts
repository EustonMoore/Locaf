import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CafeMapPage } from './cafe-map';
import { TranslateModule } from '@ngx-translate/core';
import { ContentDrawerModule } from '../../../components/content-drawer/content-drawer.module'


@NgModule({
  declarations: [
    CafeMapPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeMapPage),
    TranslateModule.forChild(),
    ContentDrawerModule
    
  ],
})
export class CafeMapPageModule {}
