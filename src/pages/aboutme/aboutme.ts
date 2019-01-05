import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage }from '@ionic/storage'
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the AboutmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aboutme',
  templateUrl: 'aboutme.html',
})
export class AboutmePage {
  rootPage:any = HomePage;
  public counter=0;
  datas:any
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public navCtrl: NavController,public toastCtrl: ToastController,public apiProvider:ApiProvider, public navParams: NavParams, public storage : Storage) {

    // storage.get("mail").then(mail => {
    //   apiProvider.postData({user_email : mail} , '/profile_api.php').then(data => {
    //     console.log(data)
    //     this.datas = data
    //     console.log(this.datas)
    //     storage.set("user_details" , data)
    //   })
    // })


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
    
    // this.get()
    storage.get("user_details").then(data => {
      console.log(data)
     if(data == null) {
        storage.get("mail").then(mail => {
          console.log(mail)
          if(mail != null) {
            apiProvider.postData({user_email : mail} , '/profile_api.php').then(user_det => {
              console.log(user_det)
              this.datas = user_det
              storage.set("user_details" , user_det)
            })
          }
          else {
            navCtrl.setRoot(HomePage)
            this.presentToast("Please fill the form to proceed")
          }
         
        })
      }
      else {
        this.datas = data
      }
      
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutmePage');
  }
  presentToastt() {
    let toast = this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }


  // next(){

  //   let demail ={
  // email:this.params.value.email
  // }
  // // this.storage.set("tempmail" , this.demail.email)
  //  console.log(demail)
  //     this.apiProvider.postData(demail,'email_api.php').then( data=>{
  //       console.log(data)
  //       this.response=data
  //       if(this.response.status==true){
  //         // this.storage.clear()
         
  //         this.email(event)
         
  //       // this.navCtrl.setRoot(ChatPage)
       
  //     }
  //     else{
  //       this.presentToast("User Register Already")
  //       // this.presentToast("User Register Alredy")
  //     }
  //     })
  // }
  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
