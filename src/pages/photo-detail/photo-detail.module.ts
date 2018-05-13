import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoDetailPage } from './photo-detail';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    PhotoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoDetailPage),
    PipesModule
  ],
})
export class PhotoDetailPageModule {}
