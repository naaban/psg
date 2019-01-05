import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Content, Platform } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Page2Page } from '../page2/page2';
import { ApiProvider } from '../../providers/api/api';
import { PayprocessPage } from '../payprocess/payprocess';

import { Storage } from '@ionic/storage'
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  // queries: {
  //   content: new ViewChild('content')
  // }

})
export class ChatPage {
 
  @ViewChild(Content) content: Content;
  params: any;
  datas: any;
  myArray: any;
  response: any;
  rootPage:any = HomePage;
  public counter=0;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public navCtrl: NavController, public apiProvider: ApiProvider, public navParams: NavParams, public toastCtrl: ToastController, public formBuilder: FormBuilder, public storage: Storage) {

    this.params = this.formBuilder.group({
      message: ['', Validators.compose([Validators.required,])],

    })

//backbutton
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



    storage.get("user_details").then(data => {
      if(data == null) {
        storage.get("mail").then(mail => {
          if(mail != null) {
            apiProvider.postData({user_email : mail} , '/profile_api.php').then(data => {
              this.datas = data
              storage.set("user_details" , data)
            })
          }
          else {
            navCtrl.setRoot(HomePage)
            this.presentToastt("Please fill the form to proceed")
          }
         
        })
      }
      
    })
  
    this.get()
  }



 presentToast() {
    let toast = this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  get() {
    this.apiProvider.getData('message.php').then(data => {
      console.log(data)
      this.datas = data
      console.log(this.datas)
      if(this.datas!= null) {
        this.scrollToBottom()
      }
    

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  send() {

    if (this.params.valid) {
      Object.assign(this.params.value)

      this.storage.get("user_details").then(user_data => {
        let data = {
          user_message: this.params.value.message,
          user_name: user_data.user_name
   
  }
  
        console.log(data)
        this.apiProvider.postData(data, 'summa_chat.php').then(data => {
          console.log(data)
          this.response = data
          if (this.response.status == true) {
            this.get()
            //  this.ionViewDidEnter()
            this.scrollToBottom()
  
            this.params.reset()
  
            // this.presentToast("Message Send Successfully")
            // this.navCtrl.setRoot(PayprocessPage)
  
          }
          else {
            this.presentToastt("Message Empty")
          }
          })
        })
  
  
      }
      
      
  }


  ionViewDidEnter() {
    this.content.scrollToBottom(300);//300ms animation speed
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }

  presentToastt(data) {
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
