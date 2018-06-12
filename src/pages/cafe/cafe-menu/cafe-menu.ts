import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cafe } from '../../../models';

/**
 * Generated class for the CafeMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cafe-menu',
  templateUrl: 'cafe-menu.html',
})
export class CafeMenuPage {

  drinkExpanded: boolean = false;
  desertExpanded: boolean = false;
  itemExpandHeight: number = 250;
  cafe: Cafe;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cafe = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CafeMenuPage');
  }

  expandDrink(){
    this.drinkExpanded = !this.drinkExpanded;
    
  }
  expandDesert(){
    this.desertExpanded = !this.desertExpanded;
  }
}
