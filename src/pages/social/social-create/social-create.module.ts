import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialCreatePage } from './social-create';
import { PipesModule } from '../../../pipes/pipes.module'
import { ElasticModule } from '../../../components/elastic-textarea/elastic-textarea.module';


@NgModule({
  declarations: [
    SocialCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(SocialCreatePage),
    PipesModule,
    ElasticModule
  ],
})
export class SocialCreatePageModule {}
