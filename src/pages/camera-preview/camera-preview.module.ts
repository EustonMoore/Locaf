import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraPreviewPage } from './camera-preview';

@NgModule({
  declarations: [
    CameraPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraPreviewPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CameraPreviewPageModule {}
