import { IonicModule } from 'ionic-angular';
import { Autosize } from './elastic-textarea';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    Autosize
  ],
  imports: [
    IonicModule
  ],
  exports: [
    Autosize
  ]
})
export class ElasticModule {}