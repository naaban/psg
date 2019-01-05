import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PayprocessPage } from '../payprocess/payprocess';
import { ApiProvider } from '../../providers/api/api';
import { Page3Page } from '../page3/page3';
import { EventPage } from '../event/event';
import { Storage } from '@ionic/storage';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the BookuroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookuroom',
  templateUrl: 'bookuroom.html',
})
export class BookuroomPage {

  response: any
  booking: any = null;

  lastdatas: any

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public apiProvider: ApiProvider, public toastCtrl: ToastController) {

    // this.lastdatas = navParams.get("fdatas");
    // console.log(this.lastdatas)

    storage.get("room").then(data => {
      if (data != null) {
        this.lastdatas = data
        console.log(this.lastdatas)
      }
      else {
        this.lastdatas = navParams.get('fdatas')
        console.log(this.lastdatas)
      }
    })
    apiProvider.getData('/book_room_api.php').then(data => {
      console.log(data)
      this.booking = data
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookuroomPage');
  }
  buttonn() {
    this.navCtrl.push(PayprocessPage)
  }
  back() {
    this.navCtrl.pop()
  }


  bookSingle(price) {
    Object.assign(this.lastdatas, {
      category: price.category,
      price: price.price,
      room_name: price.room_name
    })
    this.storage.set("room", this.lastdatas)
    this.navCtrl.push(Page3Page, { ldata: this.lastdatas })
  }
  bookDouble(price) {
    Object.assign(this.lastdatas, {
      category: price.category,
      price: price.price,
      room_name: price.room_name
    })
    this.storage.set("room", this.lastdatas)
    this.navCtrl.push(Page3Page, { ldata: this.lastdatas })

  }
  bookTriple(price) {
    Object.assign(this.lastdatas, {
      category: price.category,
      price: price.price,
      room_name: price.room_name
    })
    this.storage.set("room", this.lastdatas)
    this.navCtrl.push(Page3Page, { ldata: this.lastdatas })
  }


  nextno(price) {
    Object.assign(this.lastdatas, {
      category: "no stay",
      price: 0,
      room_name: ""
    })
    this.storage.set("room", this.lastdatas)
    this.navCtrl.push(Page3Page, { ldata: this.lastdatas })
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
