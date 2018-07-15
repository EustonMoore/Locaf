import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, App, FabContainer, Content, Platform} from 'ionic-angular';

import { Item, Cafe } from '../../../models';
import { Items, FirestoreProvider } from '../../../providers';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { firestore } from 'firebase';
// import { ImageLoaderConfig } from 'ionic-image-loader';

declare var naver: any;

@IonicPage()
@Component({
  selector: 'page-cafe-list',
  templateUrl: 'cafe-list.html'
})
export class CafeListPage {
  @ViewChild(Content) content: Content;
  @ViewChild("fab") fabHandler: FabContainer;

  // private cafes: Cafe[];
  public halfHeight = this.platform.height() / 2;
  public cafes = [];
  public lastCafe;
  public myCoords;
  public currentLocation: string = '';
  public loadMoreCheck: boolean = true;
  public filters = [{
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

  

  constructor(
    public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController, 
    public app: App,
    public firestore: FirestoreProvider,
    public geolocation: Geolocation,
    public geocoder: NativeGeocoder,
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

        let lat = 0.008983;
        let lng = 0.015060;
        let distance = 10;
      
        
        let minPoint = new firestore.GeoPoint(this.myCoords.lat - (lat * distance), this.myCoords.lng - (lng * distance));
        let maxPoint = new firestore.GeoPoint(this.myCoords.lat + (lat * distance), this.myCoords.lng + (lng * distance));

        this.firestore.getCafes().ref.orderBy('coords', 'asc').where('coords', '>=', minPoint ).where('coords', '<=', maxPoint).limit(30).get().then(snapshot => {
          this.lastCafe = snapshot.docs[snapshot.docs.length - 1];
          this.loadMoreCheck = snapshot.docs.length == 30 ? true : false;
          snapshot.forEach(snapshot => {
            let cafe = snapshot.data();
            cafe.cafeId = snapshot.id;
            cafe.distance = this.getDistance(this.myCoords, cafe.coords, 'km');
            this.cafes.push(cafe);
          })
        })

        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 1
        };

        this.geocoder.reverseGeocode(this.myCoords.lat, this.myCoords.lng, options).then((result: NativeGeocoderReverseResult[]) => {
          
          this.currentLocation = result[0].administrativeArea;
          if(result[0].administrativeArea != result[0].locality && result[0].locality) this.currentLocation += ' ' + result[0].locality;
          if(result[0].locality != result[0].subLocality && result[0].subLocality) this.currentLocation += ' ' + result[0].subLocality;
          if(result[0].subLocality != result[0].thoroughfare && result[0].thoroughfare) this.currentLocation += ' ' + result[0].thoroughfare;
        }).catch((error: any) => console.log(error));

      })
    }
    else{
      this.geolocation.getCurrentPosition().then((resp)=> {
        this.myCoords = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }

        let lat = 0.008983;
        let lng = 0.015060;
        let distance = 10;
      
        
        let minPoint = new firestore.GeoPoint(this.myCoords.lat - (lat * distance), this.myCoords.lng - (lng * distance));
        let maxPoint = new firestore.GeoPoint(this.myCoords.lat + (lat * distance), this.myCoords.lng + (lng * distance));
        this.firestore.getCafes().ref.orderBy('coords', 'desc').where('coords', '>=', minPoint ).where('coords', '<=', maxPoint).limit(30).get().then(snapshot => {
          this.lastCafe = snapshot.docs[snapshot.docs.length - 1];
          this.loadMoreCheck = snapshot.docs.length == 30 ? true : false;
          snapshot.forEach(snapshot => {
            let cafe = snapshot.data();
            cafe.cafeId = snapshot.id;
            cafe.distance = this.getDistance(this.myCoords, cafe.coords, 'km');
            this.cafes.push(cafe);
          });
        });
      });
    }
    
  }


    
  getDistance(start, end, units): string{

    let earthRadius = {
        miles: 3958.8,
        km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.latitude;
    let lon2 = end.longitude;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    let result = d >= 1 ? d.toFixed(1) + 'Km' : Math.round(d * 1000) + 'm';

    return result;

  }

  toRad(x){
    return x * Math.PI / 180;
  }


  setCurrentLocation(address){
    this.currentLocation = address;
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

      let lat = 0.008983;
      let lng = 0.015060;
      let distance = 10;
    
      
      let minPoint = new firestore.GeoPoint(this.myCoords.lat - (lat * distance), this.myCoords.lng - (lng * distance));
      let maxPoint = new firestore.GeoPoint(this.myCoords.lat + (lat * distance), this.myCoords.lng + (lng * distance));

      this.firestore.getCafes().ref.orderBy('coords', 'asc').where('coords', '>=', minPoint ).where('coords', '<=', maxPoint).limit(30).startAfter(this.lastCafe).get().then(snapshot => {
        this.lastCafe = snapshot.docs[snapshot.docs.length - 1];
        this.loadMoreCheck = snapshot.docs.length == 30 ? true : false;
        snapshot.forEach(snapshot => {
          let cafe = snapshot.data();
          cafe.cafeId = snapshot.id;
          this.cafes.push(cafe);
        })
      })
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

 
}
