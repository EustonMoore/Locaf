import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, App, FabContainer, Content} from 'ionic-angular';

import { Item, Cafe } from '../../models';
import { Items, FirestoreProvider } from '../../providers';
import { Subscription } from 'rxjs/Subscription';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


@IonicPage()
@Component({
  selector: 'page-cafe-list',
  templateUrl: 'cafe-list.html'
})
export class CafeListPage {
  @ViewChild(Content) content: Content;
  @ViewChild("fab") fabHandler: FabContainer;

  private cafes: Cafe[];
  private subscriptions: Subscription[];
  title = "test";

  constructor(
    public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController, 
    public app: App,
    public firestore: FirestoreProvider,
    public geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
    ) {
      
      
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    let subscription =  this.firestore.getCafes().valueChanges().take(1).subscribe((cafes :Cafe[]) => {
      this.cafes = cafes;
      console.log(this.cafes[3]);
    })

   

  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();

  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openCafeDetailPage(cafe: Cafe) {
    
    this.app.getRootNavs()[0].push('CafeDetailPage', {
      cafe: cafe
    });
    
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    if(this.fabHandler._listsActive){
      this.fabHandler.close();
    }

    this.geolocation.getCurrentPosition().then((resp)=> {
      
      this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818).then((result: NativeGeocoderReverseResult) => {
        this.title = result.countryName;
      })
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  closeFabList(){
   if(this.fabHandler._listsActive){
     this.fabHandler.close();
   }
  }
 
}
