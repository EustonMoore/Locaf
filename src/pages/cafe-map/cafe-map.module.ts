import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CafeMapPage } from './cafe-map';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CafeMapPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeMapPage),
    TranslateModule.forChild()
  ],
})
export class CafeMapPageModule {}
