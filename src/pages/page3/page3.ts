import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ShoppingPage } from '../shopping/shopping';
import { PayprocessPage } from '../payprocess/payprocess';
import { BookuroomPage } from '../bookuroom/bookuroom';
import { FormBuilder } from '@angular/forms';
import { EventPage } from '../event/event';
import { Page11Page } from '../page11/page11';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Page3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html',
})
export class Page3Page {
veg:any
smoke:any
liquor:any
fidthdatas:any
  constructor(public navCtrl: NavController,public storage: Storage, public navParams: NavParams ,public toastCtrl: ToastController,  public formBuilder: FormBuilder) {
 
    // this.fidthdatas = navParams.get("ldata");
    // console.log(this.fidthdatas)

    storage.get("book").then(data => {
      console.log(data)
      if(data != null) {
        this.fidthdatas = data
        console.log(this.fidthdatas)
      }
      else  {
        this.fidthdatas=navParams.get('ldata')
        console.log(this.fidthdatas)
      }
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page3Page');
  }
 
  back(){
    this.navCtrl.pop()
  }

  next(){

    // Object.assign( this.params.value)
    Object.assign(this.fidthdatas , {
      vegg:this.veg,
      smoking:this.smoke,
      liq:this.liquor,
    })
    this.storage.set("book" , this.fidthdatas)
    this.navCtrl.push(Page11Page ,{fifthdatas: this.fidthdatas})
    console.log(this.fidthdatas)
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
