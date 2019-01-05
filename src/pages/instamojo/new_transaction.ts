import { Component } from '@angular/core';
import Instamojo from 'instamojo-nodejs';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { NavParams, ToastController, NavController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-new-transaction',
  templateUrl: 'new_transaction.html'
})
export class NewTransactionPage {
  amount;
  loading:any;
  instamojoClient;
  pay: any
  response: any
  paymentResponse: any;
  constructor(public loadingCtrl: LoadingController,private iab: InAppBrowser,public navCtrl : NavController, public toastCtrl: ToastController, public storage: Storage, public apiProvider: ApiProvider, public navParams: NavParams, private http: HTTP) {
    this.instamojoClient = new Instamojo(http, iab, 'http://yourchoiz.com/alumniportal/access_token.php');
    
    storage.get("mail").then(mail => {
      this.presentLoadingCustom()
      this.loading.present().then(() => {
      if (mail != null) {
        // this.loading.present().then(() => {
        
        apiProvider.postData({user_email : mail} , '/profile_api.php').then(profile => {
          this.loading.dismiss();
          console.log(profile)
          this.pay = profile
          this.payNow(this.pay)
        })
      // })
      }
      else {
        this.presentToast("Please Fill the Form to proceed")
        navCtrl.setRoot(HomePage)
      }
    })
    })
    console.log(this.pay)
    
    
    // this.submitOn()
  }

  payNow(pay) {
    console.log(this.pay)
    var data = this.instamojoClient.getPaymentFields();
    data.purpose = "Production";            // REQUIRED
    data.amount = pay.price;                  // REQUIRED

    // do not change this
    // data.redirect_url = "http://localhost";
    this.instamojoClient.payNow(data).then(response => {
      alert("Payment complete: " + JSON.stringify(response));
      // this.submitOn()
      this.storage.get("mail").then(mail => {
        this.apiProvider.postData({ email: mail, pay: 1 }, '/pay_api.php').then(payment => {
          this.paymentResponse = payment
          if(this.paymentResponse.status) {
            this.navCtrl.pop()
            this.presentToast("Payment Success")
          }
        })
      })

      this.presentToast("Payment Successfull")

    }).catch(err => {
      alert("Payment failed: " + JSON.stringify(err));
      throw err;
    });
    //call the Safari View Controller

    // end of safari view controller



  }




  submitOn() {

    let data = {
      name: this.pay.name,
      date: this.pay.fdate,
      phone: this.pay.phone,
      email: this.pay.email,
      address: this.pay.address,

      alumni_dept: this.pay.fdept,
      achievement: this.pay.achive,
      spouse_name: this.pay.spouse,
      childrens: this.pay.childno,
      wed_date: this.pay.weddate,
      occupation: this.pay.occupation,
      company: this.pay.company,
      current_position: this.pay.position,
      travel_mode: this.pay.modetravel,
      destination_date: this.pay.dDA,
      destination_time: this.pay.tDA,
      departure_date: this.pay.dD,
      departure_time: this.pay.tD,
      food_type: this.pay.vegg,
      smoking: this.pay.smoking,
      liquor: this.pay.liq,
      clg_photo: this.pay.clg_photo,
      family_photo: this.pay.family_photo,
      room_name: this.pay.room_name,
      catagory: this.pay.category,
      price: this.pay.price
    }
    // Object.assign(this.lastdatas , data)
    console.log(data)
    this.apiProvider.postData(data, 'about_api.php').then(data => {
      console.log(data)
      this.response = data
      if (this.response.status == true) {
        this.storage.clear()



      }
    })
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

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div >
       <ion-row class="loadingBar">
         <ion-col>
         <img class="image" src="../../assets/imgs/14.jpg" alt="" width="50px" height="50px">
         </ion-col>
         <ion-col style="color:#000">
            Please Wait..
         </ion-col>
       </ion-row>
       </div>`,
      duration: 500
    });
  }

}
