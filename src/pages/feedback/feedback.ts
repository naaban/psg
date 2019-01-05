import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ToastController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage}  from '@ionic/storage'
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  @ViewChild(Content) content: Content;
  rootPage:any = HomePage;
  public counter=0;
  params: any;
  datas: any;
  myArray: any;
  response: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public navCtrl: NavController,public storage : Storage, public apiProvider: ApiProvider, public navParams: NavParams, public toastCtrl: ToastController, public formBuilder: FormBuilder) {
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
    this.params = this.formBuilder.group({
      message: ['', Validators.compose([Validators.required,])],

    })
    this.get()
  }



  user_det : any;
  get() {
    this.storage.get("mail").then(mail => {
      console.log(mail)
      this.apiProvider.postData({user_email : mail} , '/profile_api.php').then(user_Det => {
        console.log(user_Det)
        this.user_det = user_Det
        // let data ={id : this.user_det.id}
     
        this.apiProvider.getData('/assis_api.php?id='+this.user_det.id).then(chat => {
          console.log(chat)
          this.datas = chat
          this.datas = this.datas.chat
          console.log(this.datas)
          this.scrollToBottom()
    
        })
      })
    })
   
  }

  presentToastt() {
    let toast = this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  send() {
    
    this.storage.get("mail").then(mail => {
      console.log(mail)
    })
    if (this.params.valid) {
      Object.assign(this.params.value)
      this.storage.get("mail").then(mail => {
        console.log(mail)
        this.apiProvider.postData({user_email : mail} , '/profile_api.php').then(user_Det => {
          console.log(user_Det)
          this.user_det = user_Det
          let data = {
            user_message: this.params.value.message,
            user_name : this.user_det.user_name,
            id : this.user_det.id
    
          }
    
          console.log(data)
          this.apiProvider.postData(data, '/assistance_api.php').then(data => {
            console.log(data)
            this.response = data
            this.get()
            if (this.response.status == true) {
              console.log(this.response)
              this.get()
              //  this.ionViewDidEnter()
              this.scrollToBottom()
    
              this.params.reset()
    
              // this.presentToast("Message Send Successfully")
              // this.navCtrl.setRoot(PayprocessPage)
    
            }
          })
        })
      })
     


    }
    else {
      this.presentToast("Message Empty")
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