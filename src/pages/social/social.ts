import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, FabContainer, App } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html'
})
export class SocialPage {

  @ViewChild(Content) content: Content;
  @ViewChild("fab") fabHandler: FabContainer;

  public view = 'list';
  currentItems: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public items: Items) {

    


   }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  
  openSocialSearchPage(item: Item) {
    
    this.app.getRootNavs()[0].push('SocialSearchPage', {
      item: item
     
    });
    
  }

  openSocialCreatePage(item: Item) {
    
    this.app.getRootNavs()[0].push('SocialCreatePage', {
      item: item
     
    });
    
  }


}
