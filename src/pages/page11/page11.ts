import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ShoppingPage } from '../shopping/shopping';
import { Page3Page } from '../page3/page3';
import { EventPage } from '../event/event';
import { FormBuilder, Validators } from '@angular/forms';
import { PayprocessPageModule } from '../payprocess/payprocess.module';
import { PayprocessPage } from '../payprocess/payprocess';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the Page11Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page11',
  templateUrl: 'page11.html',
})
export class Page11Page {
  params: any
  year: any = Number(new Date().getFullYear()) + 50;

  seconddatas: any
  modetravel: any
  sdatas: any
  dateDA: any
  dateD: any
  timeDA: any
  timeD: any
  response: any;
  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public toastCtrl: ToastController, public formBuilder: FormBuilder, public apiProvider: ApiProvider) {
    // this.params = this.formBuilder.group({
    //   modetravel: ['', Validators.compose([Validators.required,])],

    // })
    // this.seconddatas = navParams.get("fifthdatas");
    // console.log(this.seconddatas)

    storage.get("book").then(data => {
      if (data != null) {
        this.seconddatas = data
        console.log(this.seconddatas)
      }
      else {
        this.seconddatas = navParams.get('fifthdatas')
        console.log(this.seconddatas)
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page11Page');
  }



  back() {
    this.navCtrl.pop()
  }


  submit() {

  }
  nextData : any;
  next() {
    // if (this.params.valid){
    // Object.assign(this.seconddatas,this.params.value)
    Object.assign(this.seconddatas, {
      modetravel: this.modetravel,
      dDA: this.dateDA,
      dD: this.dateD,
      tDA: this.timeDA,
      tD: this.timeD,
    })

    this.storage.set("travel", this.seconddatas)
    console.log(this.seconddatas)
    let data = {
      name: this.seconddatas.name,
      date: this.seconddatas.fdate,
      phone: this.seconddatas.phone,
      email: this.seconddatas.email,
      address: this.seconddatas.address,
      alumni_dept: this.seconddatas.fdept,
      achievement: this.seconddatas.achive,
      spouse_name: this.seconddatas.spouse,
      childrens: this.seconddatas.childno,
      wed_date: this.seconddatas.weddate,
      occupation: this.seconddatas.occupation,
      company: this.seconddatas.company,
      current_position: this.seconddatas.position,
      travel_mode: this.seconddatas.modetravel,
      destination_date: this.seconddatas.dDA,
      destination_time: this.seconddatas.tDA,
      departure_date: this.seconddatas.dD,
      departure_time: this.seconddatas.tD,
      food_type: this.seconddatas.vegg,
      smoking: this.seconddatas.smoking,
      liquor: this.seconddatas.liq,
      clg_photo: this.seconddatas.clg_photo,
      family_photo: this.seconddatas.family_photo,
      room_name: this.seconddatas.room_name,
      catagory: this.seconddatas.catagory,
      price: this.seconddatas.price
    }
    console.log(data)
    this.apiProvider.postData(data, 'about_api.php').then(data => {
      console.log(data)
      this.response = data
      if (this.response.status == true) {
        this.storage.get("tempmail").then(mail => {
          console.log(mail)
          this.storage.set("mail", mail)
          this.storage.remove("tempmail")
          this.apiProvider.postData({user_email : mail} , '/profile_api.php').then(profile => {
            
            this.navCtrl.push(PayprocessPage, { tdatas: profile })
          })
         
        })
        this.storage.clear()
        this.presentToast("User Created Successfully")

      }
    })
    // this.navCtrl.push(EventPage)


    // }
    // else {
    //     this.presentToast("Enter Valid Details")
    //   }
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
