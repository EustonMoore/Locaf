import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider, FirestoreProvider, AuthProvider } from '../../../providers';
import { User } from '../../../models';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

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
  private user: User;
  public childComments: Map<string, any[]>

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public afs: AngularFirestore,
    public firestore: FirestoreProvider,
    public auth: AuthProvider,
    public loading: LoadingProvider) {
    //this.loading.show();  
    

   

  }

  ionViewDidLoad() {
    this.feed = this.navParams.get('feed');
    console.log('ionViewDidLoad SocialCommentPage');
    this.childComments = new Map<string, any[]>();
    this.user = this.auth.getUserData();
    
    this.feed.commentRef.orderBy('date', 'asc').get().then(snapshot => {
    
      let comments = [];
      snapshot.forEach(snap => {
        let comment = snap.data();
        this.firestore.get('users/' + comment.writerId).then(ref => {
          ref.valueChanges().take(1).subscribe((user: User) => {
            comment.writer = user;
          });
        });
        comment.commentId = snap.id;

        if(snap.data().parentId && this.childComments.get(snap.data().parentId)) {
          this.childComments.get(snap.data().parentId).push(comment);
        }
        else if(snap.data().parentId && !this.childComments.get(snap.data().parentId)){
          let childComments = [];
          childComments.push(comment);
          this.childComments.set(snap.data().parentId, childComments);
        }
        else{
          comments.push(comment);
        }
      });
      
      this.feed.comments = comments
      this.loading.hide();
    });
  }
  

  writeComment(parentId){
   
    this.firestore.get('feeds/' + this.feed.feedId).then(feedRef => {
      //this.loading.show();

      feedRef.collection('comments').add({
        writerId: this.user.userId,
        description: this.comment,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        parentId: parentId
      }).then((success) => {
        this.firestore.get('users/' + this.user.userId).then(ref => {
          let userComments
          ref.valueChanges().take(1).subscribe((user: User) => {
            userComments = user.comments
          })
          this.loading.hide();
          this.ionViewDidLoad();
          
         
        })
        // this.afs.firestore.runTransaction(t => {
        //   return t.get(feedRef.ref).then(doc => {
        //     let newCommentNum = doc.data().commentNum + 1;
        //     t.update(feedRef.ref, {commentNum: newCommentNum});
        //   });
        // }).then(result => {
        
        // }).catch(err => {
        //   console.log(err);
        // })
      })
    })
  }

  
  
}
