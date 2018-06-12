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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialSearchPage');
    
  }

  ionViewDidEnter() {
  
      this.searchbar.setFocus();
   
  }

}
