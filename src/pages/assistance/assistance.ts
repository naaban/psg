import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FormBuilder, Validators } from '@angular/forms';
import {Storage } from '@ionic/storage'
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/**
 * Generated class for the AssistancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assistance',
  templateUrl: 'assistance.html',
})
export class AssistancePage {
  rootPage:any = HomePage;
  public counter=0;
params:any;
response:any;
data:any
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public navCtrl: NavController,public strorage : Storage, public apiProvider : ApiProvider, public navParams: NavParams,public toastCtrl: ToastController,  public formBuilder: FormBuilder) {
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
    console.log('ionViewDidLoad AssistancePage');
  }

  usrDet : any;
  next(){
    if (this.params.valid){
      Object.assign(  this.params.value)
     

      this.strorage.get("mail").then(mail => {
        console.log(mail)
        this.apiProvider.postData({user_email : mail} , '/profile_api.php').then(userDet => {
          console.log(userDet)
          this.usrDet  = userDet ;
          let data={
            user_message:this.params.value.message,
            user_name : this.usrDet.user_name,
            id : this.usrDet.id
          }
          
                console.log(data)
                this.apiProvider.postData(data, 'feedback_msg.php').then(data => {
                  console.log(data)
                  this.response=data
                  if(this.response.status==true){
                 
                  //  this.ionViewDidEnter()
            
          
                  this.presentToast("Feedback sent")
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
