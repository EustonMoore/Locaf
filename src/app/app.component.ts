import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, MenuController } from 'ionic-angular';
import { Settings, TranslateProvider, AlertProvider, AuthProvider } from '../providers';
import { AngularFirestore } from 'angularfire2/firestore';
import { HeaderColor } from '@ionic-native/header-color';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  @ViewChild(Nav) nav: Nav;

  pages: any;

  constructor(
    private translateService: TranslateService, 
    private translate: TranslateProvider,
    private platform: Platform, 
    private settings: Settings, 
    private config: Config, 
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private headerColor: HeaderColor,
    private alert: AlertProvider,
    private auth: AuthProvider,

    private afs: AngularFirestore,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('android')) {
        this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString('#ffffff');
      }
      
      // this.headerColor.tint('#ffffff');
      this.splashScreen.hide();
      
      this.menuCtrl.enable(false);
    });
    this.initTranslate();
    
  this.pages = [
    
    { title: '방문기록', component: 'WelcomePage' },
    { title: '제보하기', component: 'TabsPage' },
    { title: 'FAQ', component: 'CardsPage' },
    { title: '설정', component: 'SettingsPage' },
    { title: '도움말', component: 'LoginPage' },
    { title: '로그아웃', component: 'LoginPage' }
  ]
   
  }

  initTranslate() {
    
    // Set the default language for translation strings, and the current language.
    this.translateService.setDefaultLang('en');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use('en');
    this.translateService.getTranslation('en').subscribe(translations => {
      this.translate.setTranslations(translations);
      this.rootPage = 'LoaderPage';
    })
    

    // this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
    //   this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    // });
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == 'Logout') this.logout();
    else{
      this.nav.push(page.component);
    }
    // this.nav.setRoot(page);

  }

  logout(): void {
    this.alert.showConfirm('asd', 'asd', 'asd', 'asd').then(confirm => {
      if (confirm) {
        this.auth.logout().then(() => {
          this.menuCtrl.close();
          this.menuCtrl.enable(false);
          //this.notification.destroy();
          this.nav.setRoot('LoginPage');
          
        }).catch(() => { });
      }
    }).catch(() => { });
  }
}
