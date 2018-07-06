
export namespace Environment {
    // Set your app configurations here.
    // For the list of config options, please refer to https://ionicframework.com/docs/api/config/Config/
    export const config = {
      mode: 'ios', //Firestarter's style is custom-designed based on iOS style, removing or changing this WILL MAKE THE APP LOOK BAD.
      menuType: 'overlay'
    };
    // Set language to use.
    export const language = 'en';
    // Firebase Cloud Messaging Server Key.
    // Get your gcmKey on https://console.firebase.google.com, under Overview -> Project Settings -> Cloud Messaging.
    // This is needed to send push notifications.
    export const gcmKey = 'AAAAko64RCw:APA91bFvJT5kz7B4-IK4JqluQuHXXhET7rp7n6g6ojpYmG8oaaCz-yt_qRF84Sf5ooJmpohJiqHFc5wDylkwAMd1uXZOhur-GMghY02YmDAtT90pHItMu42zz-YXw-a1aWTk8rSN4sqR';
    // Set to your Firebase app, you can find your credentials on Firebase app console -> Add Web App.
    export const firebase = {
      apiKey: "AIzaSyAxWR93jzgKRV3Tc4pbLdnPoOCeHaNbMtY",
      authDomain: "locaf-5f731.firebaseapp.com",
      databaseURL: "https://locaf-5f731.firebaseio.com",
      projectId: "locaf-5f731",
      storageBucket: "locaf-5f731.appspot.com",
      messagingSenderId: "785993744461"
    };
    // You can find your googleWebClientId on your Firebase app console -> Authentication -> Sign-in Method -> Google -> Web client ID
    export const googleWebClientId: string = '579230665805-qbcjf6jips1e8v4siv7bgfd5dqbde2v7.apps.googleusercontent.com';
    // Loading Configuration.
    // Please refer to the official Loading documentation here: https://ionicframework.com/docs/api/components/loading/LoadingController/
    export const loading = {
      spinner: 'circles'
    };
    // Toast Configuration.
    // Please refer to the official Toast documentation here: https://ionicframework.com/docs/api/components/toast/ToastController/
    export const toast = {
      position: 'bottom' // Position of Toast, top, middle, or bottom.
    };
    export const toastDuration = 3000; // Duration (in milliseconds) of how long toast messages should show before they are hidden.
  }
  

