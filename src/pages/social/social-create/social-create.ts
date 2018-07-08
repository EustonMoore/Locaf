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
  public imageData: string;
  public thumbnail: string;
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

      
    this.imageData = navParams.get('imageData');
    this.thumbnail = navParams.get('thumbnail');
    this.selectedCafe = navParams.get('cafe');
      
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
        this.storage.uploadPhoto(this.user.userId, this.imageData, this.thumbnail, success.id).then((url) => {
          let photoUrl = [];
          photoUrl.push(url[0]);

          let thumbnailUrl = url[1];
          
          ref.doc(success.id).ref.update({
            feedId: success.id,
            images: photoUrl,
            thumbnail: thumbnailUrl
          }).then(success => {
            if(this.navCtrl.getByIndex(1).name == 'CafeDetailPage') this.navCtrl.popTo(this.navCtrl.getByIndex(1)).then(() => {
              this.navCtrl.getByIndex(1)._didLoad();
            });
            else this.navCtrl.popToRoot().then(() => {
              this.navCtrl.getActiveChildNavs()[0]._tabs[1]._views[0]._didLoad();
            });
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
