import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ModalController } from 'ionic-angular';

import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library';
/**
 * Generated class for the SocialCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const THUMBNAIL_WIDTH = 512;
const THUMBNAIL_HEIGHT = 384;

@IonicPage()
@Component({
  selector: 'page-social-create',
  templateUrl: 'social-create.html',
})
export class SocialCreatePage {

  thumbnailWidth = THUMBNAIL_WIDTH + 'px';
  thumbnailHeight = THUMBNAIL_HEIGHT + 'px';
  library: LibraryItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private photoLibrary: PhotoLibrary, 
    private platform: Platform, 
    private cd: ChangeDetectorRef,
    private toastCtrl: ToastController, 
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialCreatePage');
    this.library = [];
    this.fetchPhotos();
  }


  fetchPhotos() {

    this.platform.ready().then(() => {

      this.library = [];

      this.photoLibrary.getLibrary({ itemsInChunk:20, thumbnailWidth: THUMBNAIL_WIDTH, thumbnailHeight: THUMBNAIL_HEIGHT, chunkTimeSec: 0.3 }).subscribe({
        next: (chunk) => {
          this.library = this.library.concat(chunk);
          //this.library = this.library.slice(0, 9); // To take top 10 images
          this.cd.detectChanges();
        },
        error: (err: string) => {
          if (err.startsWith('Permission')) {

            let permissionsModal = this.modalCtrl.create('PermissionsPage');
            permissionsModal.onDidDismiss(() => {
              // retry
              this.fetchPhotos();
            });
            permissionsModal.present();

          } else { // Real error
            let toast = this.toastCtrl.create({
              message: `getLibrary error: ${err}`,
              duration: 6000,
            });
            toast.present();
          }
        },
        complete: () => {
          // Library completely loaded
        }
      });

    });

    // this.photoLibrary.requestAuthorization().then(() => {
    //   console.log(this.photoLibrary.getAlbums());
    
    //   this.photoLibrary.getLibrary({itemsInChunk: 20 }).subscribe({
    //     next: library => {
    //       this.library = library;
    //       library.forEach(function(libraryItem) {
    //         console.log(libraryItem.id);          // ID of the photo
    //         console.log(libraryItem.photoURL);    // Cross-platform access to photo
    //         console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
    //         console.log(libraryItem.fileName);
    //         console.log(libraryItem.width);
    //         console.log(libraryItem.height);
    //         console.log(libraryItem.creationDate);
    //         console.log(libraryItem.latitude);
    //         console.log(libraryItem.longitude);
    //         console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
    //       });
    //     },
    //     error: err => { console.log('could not get photos'); },
    //     complete: () => { console.log('done getting photos'); }
    //   });
    // })
    // .catch(err => console.log('permissions weren\'t granted'));

  }

  itemTapped(event, libraryItem) {
    this.navCtrl.push('PhotoDetailPage', {
      libraryItem: libraryItem
    });
  }

  trackById(index: number, libraryItem: LibraryItem): string { return libraryItem.id; }

}
