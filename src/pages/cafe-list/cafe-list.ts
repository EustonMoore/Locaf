import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, App, FabContainer, Content, Platform} from 'ionic-angular';

import { Item, Cafe } from '../../models';
import { Items, FirestoreProvider } from '../../providers';
import { Subscription } from 'rxjs/Subscription';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Geocoder,
  GeocoderResult,
  ILatLng
} from '@ionic-native/google-maps';



@IonicPage()
@Component({
  selector: 'page-cafe-list',
  templateUrl: 'cafe-list.html'
})
export class CafeListPage {
  @ViewChild(Content) content: Content;
  @ViewChild("fab") fabHandler: FabContainer;

  // private cafes: Cafe[];
  private cafes: any[];
  private subscriptions: Subscription[];
  private myCoords;
  public currentLocation = "";
  private filter_1 = {
    name: 'smoking',
    value: false,
    color:  'rgba(255, 255, 255, 0.3)'
  };
  private filter_2 = {
    name: 'parking',
    value: false,
    color:  'rgba(255, 255, 255, 0.3)'
  };
  private filter_3 = {
    name: 'wifi',
    value: false,
    color:  'rgba(255, 255, 255, 0.3)'
  };
  private filter_4 = {
    name: 'preOpen',
    value: false,
    color:  'rgba(255, 255, 255, 0.3)'
  };
  mapReady: boolean = false;
  map: GoogleMap;

  constructor(
    public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController, 
    public app: App,
    public firestore: FirestoreProvider,
    public geolocation: Geolocation,
    public platform: Platform
    ) {
      
      
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    let subscription =  this.firestore.getCafes().valueChanges().take(1).subscribe((cafes :any[]) => {    // => cafes: Cafe[]
      this.cafes = cafes;
      this.cafes.forEach(cafe => {
        cafe.favorite = false;
      })
    })
    this.getCurrentLocation();
   

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

  openCafeMapPage(){
    this.app.getRootNavs()[0].push('CafeMapPage', {
      coords: this.myCoords
    });
  }

  getCurrentLocation(){
    
    if(this.platform.is('cordova')){
      this.geolocation.getCurrentPosition().then((resp)=> {
        this.myCoords = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
        Geocoder.geocode({
          "position": this.myCoords
        }).then((results: GeocoderResult[]) => {
          console.log(results[0]);
          if (results.length == 0) {
            // Not found
            return null;
          }
          this.currentLocation = "";
          let split= results[0].extra.lines[0].split(" ");
          for(let i = 1 ; i < 4; i ++){
            this.currentLocation += split[i] + ' ';
          }
        });
      })
    }
    else{
      this.geolocation.getCurrentPosition().then((resp)=> {
        this.myCoords = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
      })
    }
  }

  addToFav(cafe) {
    cafe.favorite = !cafe.favorite;
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    if(this.fabHandler._listsActive){
      this.fabHandler.close();
    }
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

  checkFilter(filter){
    console.log(filter);
    if(filter.value){
      filter.color = 'rgba(255, 255, 255, 0.3)';
      filter.value = !filter.value;
    }
    else{
      filter.color = 'rgba(54, 90, 85, 0.7)';
      filter.value = !filter.value;
    }
    // fab.setAttribute('background-color', 'rgba(255, 255, 255, 0.5)' )
  }
 
}
