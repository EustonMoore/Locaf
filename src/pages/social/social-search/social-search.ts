import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';

/**
 * Generated class for the SocialSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social-search',
  templateUrl: 'social-search.html',
})
export class SocialSearchPage {
  @ViewChild('searchBar') searchbar: Searchbar;

  public keyword = 'search';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  
               
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialSearchPage');
    let param = this.navParams.get('keyword');
    if(param) this.keyword = param;
    else this.searchbar.setFocus();
    
  }

  ionViewDidEnter() {
  
      
   
  }

}
