import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { WebIntent } from '@ionic-native/web-intent';
import { Market } from '@ionic-native/market';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
/**
 * Generated class for the CabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cabs',
  templateUrl: 'cabs.html',
})
export class CabsPage {
datas:any
rootPage:any = HomePage;
  public counter=0;
 
  constructor(platform: Platform, statusBar: StatusBar, public toastCtrl: ToastController,splashScreen: SplashScreen,public navCtrl: NavController,public apiProvider:ApiProvider, public navParams: NavParams,private webIntent: WebIntent, public market: Market) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    
      platform.registerBackButtonAction(() => {
        if (this.counter == 0) {
          this.counter++;
          this.presentToastt();
          setTimeout(() => { this.counter = 0 }, 3000)
        } else {
          // console.log("exitapp");
          platform.exitApp();
        }
      }, 0)
    });
    this.get()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CabsPage');
  }

  presentToastt() {
    let toast = this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  get(){
    this.apiProvider.getData('cab_api.php').then(data=> {
       console.log(data)
     this.datas=data
       console.log(this.datas)
  
     
     })
   }

   phto: any = "";
   hideClg : boolean = false;
   setImg(){
   this.phto='base64' + this.datas.logo;
   }
  go(event){
    console.log(event)
    this.market.open(event.link);
    // const options = {
    //   action: this.webIntent.ACTION_VIEW,
    //   url: event.link,
    //   type: 'application/vnd.android.package-archive'
    // };
  }
}
