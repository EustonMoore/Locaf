import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root } from '../';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  
  private subscriptions: Subscription[];
  public selected = "0";
  public show = true;
  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(public navCtrl: NavController, 
              public translateService: TranslateService,
              ) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });

   
    
  }

  segmentChanged(event){
    this.navCtrl.getActiveChildNavs()[0].select(+event.value);
  }
 
  ionViewCanEnter(){
    console.log('enter')
  }

  ionViewCanLeave(){
    console.log('leave')
  }
}
