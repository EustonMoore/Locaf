import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, App, FabContainer, Content, Platform} from 'ionic-angular';

import { Item, Cafe } from '../../../models';
import { Items, FirestoreProvider } from '../../../providers';
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
  ILatLng,
  Spherical
} from '@ionic-native/google-maps';
// import { ImageLoaderConfig } from 'ionic-image-loader';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-cafe-list',
  templateUrl: 'cafe-list.html'
})
export class CafeListPage {
  @ViewChild(Content) content: Content;
  @ViewChild("fab") fabHandler: FabContainer;

  // private cafes: Cafe[];
  halfHeight = this.platform.height() / 2;
  private cafes: any[];
  private myCoords;
  public currentLocation = "";
  private filters = [{
    name: 'no-smoking',
    value: false,
    color:  'rgba(255, 255, 255, 0.3)'
    },
    {
    name: 'parking',
    value: false,
    color:  'rgba(255, 255, 255, 0.3)'
    },
    {
    name: 'wifi',
    value: false,
    color:  'rgba(255, 255, 255, 0.3)'
    },
    {
    name: 'preOpen',
    value: false,
    color:  'rgba(255, 255, 255, 0.3)'
    }];
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
    // private imageLoaderConfig: ImageLoaderConfig
    ) {
    
    // imageLoaderConfig.setWidth(platform.width() + 'px');
    // imageLoaderConfig.setHeight(platform.width() + 'px');
    // imageLoaderConfig.enableFallbackAsPlaceholder(true);
    // imageLoaderConfig.setFallbackUrl('assets/img/cafe.jpg');
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    
    // let subscription =  this.firestore.getCafes().valueChanges().take(1).subscribe((cafes :any[]) => {    // => cafes: Cafe[]
    //   this.cafes = cafes;
    //   this.cafes.forEach(cafe => {
    //     cafe.favorite = false;
    //   })
    // })
    this.getCurrentLocation();
    
    
  }

 
  ionViewWillUnload() {
    // Unsubscribe to Subscription.
    
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

  openCafeDetailPage(cafe: Cafe) {
    this.app.getRootNavs()[0].push('CafeDetailPage', {
      cafe: cafe
    });
    
  }

  openCafeMapPage(){
    if(this.fabHandler._listsActive){
      this.fabHandler.close();
    }
    this.app.getRootNavs()[0].push('CafeMapPage', {
      coords: this.myCoords,
      filters: this.filters,
      cafes: this.cafes
    });
  }

  openNoticePage(){
    this.app.getRootNavs()[0].push('NoticePage', {
      from: 'cafe'
    });
  }

  getCurrentLocation(){
    
    if(this.platform.is('cordova')){
      this.geolocation.getCurrentPosition().then((resp)=> {
        this.myCoords = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
        this.firestore.getCafesNearBy(this.myCoords, 10).valueChanges().take(1).subscribe((cafes: Cafe[]) => {
          
          this.cafes = cafes;
          this.cafes.forEach(cafe => {
            let destination = {
              lat: cafe.coords.latitude,
              lng: cafe.coords.longitude
            }
            
            cafe.distance = Spherical.computeDistanceBetween(this.myCoords, destination);
            console.log(cafe.distance)
          });
        })
        
        Geocoder.geocode({
          "position": this.myCoords
        }).then((results: GeocoderResult[]) => {
         
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
  
        this.firestore.getCafesNearBy(this.myCoords, 10).valueChanges().take(1).subscribe((cafes: any[]) => {
          
          this.cafes = cafes;
        });
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
    
    if(filter.value){
      filter.color = 'rgba(255, 255, 255, 0.3)';
      filter.value = !filter.value;
    }
    else{
      filter.color = '#3c4240';
      filter.value = !filter.value;
    }
    // fab.setAttribute('background-color', 'rgba(255, 255, 255, 0.5)' )
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.firestore.getCafesNearBy(this.myCoords, 10).valueChanges().take(1).subscribe((cafes: Cafe[])=>{
        console.log(cafes);
        cafes.forEach(cafe => {
          this.cafes.push(cafe);
        })
      })

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

 
}
