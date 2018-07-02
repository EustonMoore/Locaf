import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialCommentPage } from './social-comment';
import { ElasticModule } from '../../../components/elastic-textarea/elastic-textarea.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SocialCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialCommentPage),
    ElasticModule,
    PipesModule
  ],
})
export class SocialCommentPageModule {}
