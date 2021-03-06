import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { FirestoreProvider, AuthProvider } from '../../../providers';
import { Cafe, Feed, User } from '../../../models';


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

  halfHeight = this.platform.height() / 2;
  feeds: any[];
  user: User;
  public lastFeed: any;
  public loadMoreCheck: boolean = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public auth: AuthProvider,
              public platform: Platform,
              public firestore: FirestoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialListPage');
    this.user = this.auth.getUserData();


    
    this.firestore.getFeeds().ref.orderBy('date', 'desc').limit(15).get().then(snapshot => {
      this.feeds = [];
      this.lastFeed = snapshot.docs[snapshot.docs.length - 1];
      this.loadMoreCheck = snapshot.docs.length == 15 ? true : false;
      snapshot.docs.forEach(doc => {
        let feed = doc.data();

        this.firestore.get('users/' + doc.data().writerId).then(ref => {
          ref.valueChanges().take(1).subscribe((user: User)=> {
            feed.writer = user;
          });
        });

        feed.commentRef = doc.ref.collection('comments');
        doc.ref.collection('comments').get().then(comments => {
          feed.commentNum = comments.size
        })

        this.feeds.push(feed);

      });
    });
    // this.firestore.getFeeds().snapshotChanges().take(1).subscribe(feeds => {
      
    //   feeds.forEach(snapshot => {
    //     let feed = snapshot.payload.doc.data();
    //     feed.feedId = snapshot.payload.doc.id;
    //     this.firestore.get('users/' + feed.writerId).then(ref => {
    //       ref.valueChanges().take(1).subscribe((user: User) => {
    //         feed.writer = user;
            
    //       })
    //     });
       
    //     feed.commentRef = snapshot.payload.doc.ref.collection('comments');
    //     snapshot.payload.doc.ref.collection('comments').get().then(comments => {
    //       feed.commentNum = comments.size
    //     })
        
    //     console.log(feed);
    //     this.feeds.push(feed);
    //   })
      

    // })

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

  openCafeDetailPage(cafeId){
    this.firestore.getCafe(cafeId).valueChanges().take(1).subscribe((cafe: Cafe) => {
      this.navCtrl.push('CafeDetailPage', {cafe: cafe})
    })
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '신고',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: '팔로우 취소',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: '숨기기',
          handler: () => {
            console.log('Archive clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }


  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.firestore.getFeeds().ref.orderBy('date', 'desc').limit(15).startAfter(this.lastFeed).get().then(snapshot => {
        this.lastFeed = snapshot.docs[snapshot.docs.length - 1];
        this.loadMoreCheck = snapshot.docs.length == 15 ? true : false;
        snapshot.docs.forEach(doc => {
          let feed = doc.data();
  
          this.firestore.get('users/' + doc.data().writerId).then(ref => {
            ref.valueChanges().take(1).subscribe((user: User)=> {
              feed.writer = user;
            });
          });
  
          feed.commentRef = doc.ref.collection('comments');
          doc.ref.collection('comments').get().then(comments => {
            feed.commentNum = comments.size
          })
  
          this.feeds.push(feed);
  
        });
      });

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  
}
