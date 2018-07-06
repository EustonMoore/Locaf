import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Platform } from 'ionic-angular/platform/platform';
import { Geolocation } from '@ionic-native/geolocation';
import { Cafe } from '../../../models';
declare var naver;
declare var google;
/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cafe-map',
  templateUrl: 'cafe-map.html',
})
export class CafeMapPage {

  public autocomplete = {input: '', lastInput: '검색'};
  public autocompleteItems = [];
  public googleAutocomplete = new google.maps.places.AutocompleteService();
  public myMarker: any;
  public map: any;
  public drawerOptions;
  private cafes: Cafe[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public zone: NgZone, 
    public geocoder: NativeGeocoder, 
    public platform: Platform,
    public geolocation: Geolocation) {
      
      this.drawerOptions = {
        
        thresholdFromBottom: this.platform.height() * 2/5,
        thresholdFromTop: this.platform.height() * 4/5,
        bounceBack: true
      };
     
    
  }

  ionViewDidLoad() {
    
    
    let coords = this.navParams.get('coords');
    this.cafes = this.navParams.get('cafes'); 
    
    
    console.log('ionViewDidLoad MapsPage');

    this.initMap(coords);
  
  }


  initMap(coords){
   
    let latLng = new naver.maps.LatLng(coords.lat, coords.lng)
    let mapOptions = {
      center: latLng,
      zoom: 12,
      logoControl: false,
      scaleControl: false,
      disableKineticPan: false
    }

    this.map = new naver.maps.Map('map', mapOptions);
   
    this.myMarker = new naver.maps.Marker({
      position: latLng,
      map: this.map
    });




  }


  getCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp)=> {
      
      // this.firestore.getCafesNearBy(this.myCoords, 10).valueChanges().take(1).subscribe((cafes: Cafe[]) => {
      let newCenter = new naver.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map.setCenter(newCenter)
      this.myMarker.position = newCenter;
      //   this.cafes = cafes;
      //   this.cafes.forEach(cafe => {
      //     let destination = {
      //       lat: cafe.coords.latitude,
      //       lng: cafe.coords.longitude
      //     }
          
      //     // cafe.distance;
      //   });
      // })
    });
  }
  

  updateSearchResults(){
    
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.googleAutocomplete.getPlacePredictions({ input: this.autocomplete.input, types: ["establishment","geocode"], componentRestrictions: {country: 'kor'} },
    (predictions, status) => {
      this.autocompleteItems = [];
      if(predictions && predictions.length> 0){
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            
            this.autocompleteItems.push(prediction);
          });
        });
      }
      
    });
  }

  selectSearchResult(item){
    this.autocomplete.input = ''
    this.autocomplete.lastInput = item.structured_formatting.main_text;
    this.autocompleteItems = [];

    console.log(item.description)

    this.geocoder.forwardGeocode(item.description, {useLocale: true, maxResults: 1}).then(success => {
      console.log(success);
      let newCenter = new naver.maps.LatLng(success[0].latitude, success[0].longitude);
      this.map.setCenter(newCenter)
      this.myMarker.position = newCenter;
    })
  }

}
