import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SocialCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social-comment',
  templateUrl: 'social-comment.html',
})
export class SocialCommentPage {
  @ViewChild('commentInput') commentInput: ElementRef;


  private comment = ''
  public feed: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.feed = navParams.get('feed');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialCommentPage');
  }

  
  
}
