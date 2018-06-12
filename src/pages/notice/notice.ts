import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage {

  page;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.page = navParams.get('from');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage');
  }

  swipeEvent($e) {
    console.log($e.deltaX+", "+$e.deltaY);
    if($e.deltaX > 0){
      console.log("Swipe from Left to Right");
      this.page = "social";
    }else{
      console.log("Swipe from Right to Left");
      this.page = "cafe";
    }
}

}
