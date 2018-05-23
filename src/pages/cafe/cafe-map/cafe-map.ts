import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard, FabButton, FabContainer } from 'ionic-angular';
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
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateProvider } from '../../../providers';
import { ContentDrawer } from '../../../components/content-drawer/content-drawer'
import { Cafe } from '../../../models';
declare var google;

/**
 * Generated class for the CafeMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const marker_me = {
  url: 'assets/img/marker-me.png',
  size: {
    width: 32,
    height: 32
  }
};

const marker = {
  url: 'assets/img/marker.png',
  size: {
    width: 32,
    height: 32
  }
};

const marker_selected = {
  url: 'assets/img/marker-selected.png',
  size: {
    width: 40,
    height: 40
  }
};



@IonicPage()
@Component({
  selector: 'page-cafe-map',
  templateUrl: 'cafe-map.html',
})
export class CafeMapPage {
  @ViewChild("fab") fabHandler: FabContainer;
  @ViewChild(ContentDrawer) contentDrawer: ContentDrawer;


  private map: GoogleMap;
  private myCoords;
  private cafes: Cafe[];
  private filters = [];
  public autocomplete = {input: '', lastInput: this.translate.get('SEARCH_PLACEHOLDER')};
  public autocompleteItems = [];
  public googleAutocomplete = new google.maps.places.AutocompleteService();
  public drawerOptions;
  
 

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public keyboard: Keyboard,
              public zone: NgZone,
              private geolocation: Geolocation,
              private translate: TranslateProvider) {
                
    this.filters = navParams.get('filters');
    this.myCoords = navParams.get('coords');      
    this.cafes = navParams.get('cafes');     
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
  };
  
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad CafeMapPage');
    
    this.loadMap();
  }

  

  ionViewWillUnload(){
    console.log('unload');
    
    this.map.clear();
  }

  loadMap(){

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: this.myCoords,
        zoom: 16,
        
      },
      controls: {
        myLocationButton: true,
        myLocation: true,
        mapToolbar: false
      },

      gestures: {
        rotate: false
      }

    }
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
       console.log('Map is ready!');
       this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((data) =>{
        this.keyboard.close();
        console.log(data);
      })

      this.map.on(GoogleMapsEvent.MAP_DRAG).subscribe((data) =>{
        this.keyboard.close();
      })

       // Now you can use all methods safely.
       this.map.addMarker({
         title: 'Ionic',
         icon: marker_me,
         animation: 'DROP',
         position: this.myCoords
       })
       .then(marker => {
         marker.on(GoogleMapsEvent.MARKER_CLICK)
           .subscribe(() => {
            
           });
       });

       this.cafes.forEach(cafe => {
        
        let coords = {
          lat: cafe.coords.latitude,
          lng: cafe.coords.longitude
        }
        
        this.map.addMarker({
          title: cafe.cafeName,
          icon: marker,
          animation: 'DROP',
          position: coords
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
             marker.setIcon(marker_selected);
            });
        });
       })

    });
    
  }


  openCafeDetailPage(cafe: Cafe) {
    console.log(cafe);
    this.navCtrl.push('CafeDetailPage', {
      cafe: cafe
    });
    
  }

  
  addToFav(cafe) {
    cafe.favorite = !cafe.favorite;
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
    this.map.clear();
  
    Geocoder.geocode({"address": item.description}).then(
      (results: GeocoderResult[]) => {
        console.log(results[0]);
        if (results.length == 0) {
          // Not found
          return null;
        }
        let marker: Marker = this.map.addMarkerSync({
          icon: marker_me,
          animation: 'DROP',
          position: results[0].position
        })

        this.map.moveCamera({
          target: marker.getPosition(),
          zoom: 16
        })
        
        
      },
      (rej)=>{

      })
      
  
    // Geocoder.geocode({'placeId': item.place_id}, (results, status) => {
    //   if(status === 'OK' && results[0]){
    //     let position = {
    //         lat: results[0].geometry.location.lat,
    //         lng: results[0].geometry.location.lng
    //     };
    //     let marker = new google.maps.Marker({
    //       position: results[0].geometry.location,
    //       map: this.map,
    //     });
    //     this.markers.push(marker);
    //     this.map.setCenter(results[0].geometry.location);
    //   }
    // })
  }

  checkFilter(filter){
    if(filter.value){
      filter.color = 'rgba(255, 255, 255, 0.3)';
      filter.value = !filter.value;
    }
    else{
      filter.color = 'rgba(54, 90, 85, 1)';
      filter.value = !filter.value;
    }
    // fab.setAttribute('background-color', 'rgba(255, 255, 255, 0.5)' )
  }

}
