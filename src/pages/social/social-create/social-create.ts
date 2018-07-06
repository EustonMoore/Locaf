import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { File, Entry } from '@ionic-native/file';
import { AuthProvider, FirestoreProvider, StorageProvider } from '../../../providers';
import { User, Cafe } from '../../../models';
import * as firebase from 'firebase';
/**
 * Generated class for the SocialCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-social-create',
  templateUrl: 'social-create.html',
})


export class SocialCreatePage {

  private user: User;
  private selectedCafe: Cafe
  public takedPhoto: string;
  public title: string;
  public description: string;
  public cafeName: string;
  public autocomplete = {
    input: '',
    cafeId: '',
    cafeName: ''
  };
  public autocompleteItems = [];

  preparedTags = [
    '#Ionic',
    '#Angular',
    '#Javascript',
    '#Mobile',
    '#Hybrid',
    '#CrossPlatform'
  ]
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public firestore: FirestoreProvider,
    public storage: StorageProvider,
    private platform: Platform,
    ) {

      
    this.takedPhoto = navParams.get('imageData');
      
  }

 


  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialCreatePage');
    this.user = this.auth.getUserData();
  }

  
  ionViewWillLeave(){
   
  }

  writeFeed(){
    this.firestore.getCollection('feeds').then(ref => {
      ref.add({
        cafeId: this.selectedCafe.cafeId,
        cafeName: this.selectedCafe.cafeName,
        collectedNum: 0,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        description: this.description,
        title: this.title,
        writerId: this.user.userId,
      }).then(success => {
        this.storage.uploadPhoto(this.user.userId, this.takedPhoto, success.id).then((url) => {
          let photoUrl = [];
          photoUrl.push(url);
          ref.doc(success.id).ref.update({
            feedId: success.id,
            images: photoUrl
          }).then(success => {
            this.navCtrl.popAll();
          });
        })
      })
    })
  }

  updateSearchResults(event){
    console.log(this.autocomplete.input)
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    
    
    else{
      let check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;  
      this.firestore.getCollection('cafes').then(ref => {
        
        if(check.test(this.autocomplete.input)){  //한글입력확인
          ref.ref.orderBy('cafeNameKor').startAt(this.autocomplete.input.toLowerCase()).endAt(this.autocomplete.input.toLowerCase()+"\uf8ff").limit(5).get().then(results => {
            this.autocompleteItems = [];
            if(results) {
              results.forEach(result => {
                let cafe = result.data();
                cafe.cafeId = result.id;
                this.autocompleteItems.push(cafe);
              })
            }
          });
        }
        else{
          ref.ref.orderBy('cafeNameLower').startAt(this.autocomplete.input.toLowerCase()).endAt(this.autocomplete.input.toLowerCase()+"\uf8ff").limit(5).get().then(results => {
            this.autocompleteItems = [];
            if(results) {
              results.forEach(result => {
                let cafe = result.data();
                cafe.cafeId = result.id;
                this.autocompleteItems.push(cafe);
              })
            }
          });
        }
      })
    }
  }

  selectSearchResult(cafe){
    this.autocomplete.input = '';
    this.autocompleteItems = [];
    this.selectedCafe = cafe;
    
  }

  clearInput(){
    this.selectedCafe = null;
  }

}
