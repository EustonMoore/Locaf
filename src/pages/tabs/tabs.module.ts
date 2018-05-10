import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TabHiddenDirective } from '../../components/tab-hidden.directive'
import { TabsPage } from './tabs';

@NgModule({
  declarations: [
    TabsPage,
    TabHiddenDirective,
    
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    TranslateModule.forChild()
  ],
  exports: [
    TabsPage,
    TabHiddenDirective,
    
  ]
})
export class TabsPageModule { }
