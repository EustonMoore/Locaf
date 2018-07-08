import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Tabs, MenuController } from 'ionic-angular';
import { animation } from '@angular/core/src/animation/dsl';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('tabs') tabsHandler: Tabs


  tab1Root: any = 'CafeListPage';
  tab2Root: any = 'SocialGridPage';
  
  
  public selected = "0";
  public show = true;
  tab1Title = " ";
  tab2Title = " ";

  constructor(public navCtrl: NavController, 
              public translateService: TranslateService,
              public menuCtrl: MenuController
              ) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
    });

    this.menuCtrl.enable(true);
   
    
  }


  segmentChanged(event){
    this.tabsHandler.select(+event.value);
  }

  swipeEvent(event){
    let tabs = +this.selected;

    if(event.direction == 2 && tabs > 0){
      
      this.tabsHandler.select(tabs--);
      this.selected = tabs.toString();
    }
    else if(event.direction == 4 && tabs < 1){
      this.tabsHandler.select(tabs++);
      this.selected = tabs.toString();

    }
  }
 
  
}
