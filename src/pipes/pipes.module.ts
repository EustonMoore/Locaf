import { NgModule } from '@angular/core';
import { CDVPhotoLibraryPipe } from './cdvphotolibrary.pipe';
import { FromNowPipe } from './from-now';
// Add your pipes here for easy indexing.
@NgModule({
  declarations: [
    CDVPhotoLibraryPipe,
    FromNowPipe
  ],
  imports: [

  ],
  exports: [
    CDVPhotoLibraryPipe,
    FromNowPipe
  ]
})
export class PipesModule { }
