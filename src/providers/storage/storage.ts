import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry } from '@ionic-native/file';
import { LoadingProvider, ToastProvider, TranslateProvider } from '../';
import firebase from 'firebase';

@Injectable()
export class StorageProvider {
  public profilePhoto: CameraOptions;
  public photoMessage: CameraOptions;

  constructor(private camera: Camera, public file: File,
    private loading: LoadingProvider,
    private toast: ToastProvider,
    private translate: TranslateProvider) {
    // Set profilePhoto specifications based on CameraOptions.
    // For reference: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/index.html
    this.profilePhoto = {
      quality: 25,
      targetWidth: 288,
      targetHeight: 288,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      allowEdit: true
    };

    this.photoMessage = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: false,
      allowEdit: false
    };
  }

  // Convert fileURI to Blob.
  private uriToBlob(fileURI): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.file.resolveLocalFilesystemUrl(fileURI).then((fileEntry: Entry) => {
        fileEntry.getParent((directoryEntry: Entry) => {
          this.file.readAsArrayBuffer(directoryEntry.nativeURL, fileEntry.name).then((data: ArrayBuffer) => {
            var uint8Array = new Uint8Array(data);
            var buffer = uint8Array.buffer;
            let blob = new Blob([buffer]);
            resolve(blob);
          }).catch(err => {
            reject(err);
          });
        });
      }).catch(err => {
        reject(err);
      });
    });
  }


  // Function to convert dataURI to Blob needed by Firebase
  imgURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  }

  generateFilename() {
    var length = 8;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + ".jpg";
  }


  public uploadPhoto(userId: string, imageData: string, thumbnail:string, feedId: string): Promise<string[]>{
    return new Promise((resolve, reject)=>{
      this.loading.show();
      let url = []
      let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      let imgMetadata = {
        'contentType': imgBlob.type
      };

      let thumbBlob = this.imgURItoBlob("data:image/jpeg;base64," + thumbnail);
      let thumbMetadata = {
        'contentType': thumbBlob.type
      };

      firebase.storage().ref().child('images/feeds/' + feedId + '/' + this.generateFilename()).put(imgBlob, imgMetadata).then((snapshot) => {
        url.push(snapshot.metadata.downloadURLs[0]);

        firebase.storage().ref().child('images/feeds/' + feedId + '/' + this.generateFilename()).put(thumbBlob, thumbMetadata).then((snapshot) => {
          url.push(snapshot.metadata.downloadURLs[0]);
          this.loading.hide();
          resolve(url);

        }).catch(err => {
          console.log("ERROR STORAGE: " + JSON.stringify(err));
          this.loading.hide();
          reject();
        });
      }).catch(err => {
        console.log("ERROR STORAGE: " + JSON.stringify(err));
        this.loading.hide();
        reject();
      });
    })
  }

  // Upload an image file provided the userId, cameraOptions, and sourceType.
  public upload(userId: string, options: CameraOptions, sourceType: number): Promise<string> {
    options.sourceType = sourceType;
    return new Promise((resolve, reject) => {
      // Get the image file from camera or photo gallery.
      this.camera.getPicture(options).then(fileUri => {
        this.loading.show();
        let fileName = JSON.stringify(fileUri).substr(JSON.stringify(fileUri).lastIndexOf('/') + 1);
        fileName = fileName.substr(0, fileName.length - 1);
        // Append the date string to the file name to make each upload unique.
        fileName = this.appendDateString(fileName);
        // Convert URI to Blob.
        console.log("File: " + fileName);
        console.log("FileURI: " + fileUri);
        this.uriToBlob(fileUri).then(blob => {
          let metadata = {
            'contentType': blob.type
          };
          // Upload blob to Firebase storage.
          firebase.storage().ref().child('images/' + userId + '/' + fileName).put(blob, metadata).then(snapshot => {
            let url = snapshot.metadata.downloadURLs[0];
            this.loading.hide();
            resolve(url);
          }).catch(err => {
            console.log("ERROR STORAGE: " + JSON.stringify(err));
            this.loading.hide();
            reject();
            this.toast.show(this.translate.get('storage.upload.error'));
          });
        }).catch(err => {
          console.log("ERROR BLOB: " + err);
          this.loading.hide();
          reject();
          this.toast.show(this.translate.get('storage.upload.error'));
        });
      }).catch(err => {
        console.log("ERROR CAMERA: " + JSON.stringify(err));
        reject();
        this.toast.show(this.translate.get('storage.upload.error'));
      });
    });
  }

  // Delete the uploaded file by the user, given the userId and URL of the file.
  public delete(userId: string, url: string): void {
    // Get the fileName from the URL.
    let fileName = url.substring(url.lastIndexOf('%2F') + 3, url.lastIndexOf('?'));
    // Check if file really exists on Firebase storage.
    firebase.storage().ref().child('images/' + userId + '/' + fileName).getDownloadURL().then(res => {
      // Delete file from storage.
      firebase.storage().ref().child('images/' + userId + '/' + fileName).delete();
    }).catch(err => { });
  }

  // Append the current date as string to the file name.
  private appendDateString(fileName: string): string {
    let name = fileName.substr(0, fileName.lastIndexOf('.')) + '_' + Date.now();
    let extension = fileName.substr(fileName.lastIndexOf('.'), fileName.length);
    return name + '' + extension;
  }

}
