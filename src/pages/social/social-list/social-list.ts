import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the SocialListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social-list',
  templateUrl: 'social-list.html',
})
export class SocialListPage {

  feeds = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialListPage');
    for(let i = 0; i < 30; i++){
      this.feeds.push({
        imgProfile: "assets/img/cafe.jpg",
        name: 'test',
        title: 'title',
        images: [1,2,3],
        description: 'testestest'

      })
    }

  }

  showMore(e, feed){
    
    if(e.path[1].offsetHeight < e.path[1].scrollHeight) e.path[1].style.display = 'block';
    else{
      this.openSocialCommentPage(feed);
    }
  
  }

  openSocialCommentPage(feed){
    this.navCtrl.push('SocialCommentPage', {feed: feed});
  }

}
