import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  rootPage:any = HomePage;
  public counter=0;
  datas:any
  constructor(platform: Platform, statusBar: StatusBar,public toastCtrl: ToastController, splashScreen: SplashScreen,public navCtrl: NavController,public apiProvider:ApiProvider, public navParams: NavParams) {
 
    this.get()

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    
      platform.registerBackButtonAction(() => {
        if (this.counter == 0) {
          this.counter++;
          this.presentToast();
          setTimeout(() => { this.counter = 0 }, 3000)
        } else {
          // console.log("exitapp");
          platform.exitApp();
        }
      }, 0)
    });
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  get(){
    this.apiProvider.getData('gallery_api.php').then(data=> {
       console.log(data)
     this.datas=data
       console.log(this.datas)
  
     
     })
   }

}
