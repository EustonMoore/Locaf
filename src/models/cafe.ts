import { firestore } from 'firebase';

export class Cafe {
  public object: {};
  constructor(
    public cafeId: string,
    public images: {background: String, imgBig: String, imgGallery: String[]},
    public cafeName: string,
    public address: string,
    public phone: string,
    public description: string,
    public type: string,
    public web: string,
    public rate: number,
    public location: string,
    public coords: firestore.GeoPoint,
    public station: {line: String, name: String}
  ) {
    
    this.object = {
      distance: String,
      favorite: Boolean,
      cafeId: cafeId,
      images: this.images,
      cafeName: this.cafeName,
      address: this.address,
      phone: this.phone,
      description: this.description,
      type: this.type,
      coords: this.coords,
      location: this.location,
      rate: this.rate,
      web: this.web,
      station: this.station
      
    };
  }
}
