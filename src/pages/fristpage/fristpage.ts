import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { PayprocessPage } from '../payprocess/payprocess';
import { Page2Page } from '../page2/page2';
import { EventPage } from '../event/event';
import { BookuroomPage } from '../bookuroom/bookuroom';
import { Page3Page } from '../page3/page3';
import { Page11Page } from '../page11/page11';
import { ApiProvider } from '../../providers/api/api';
import { ChatPage } from '../chat/chat';
/**
 * Generated class for the FristpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fristpage',
  templateUrl: 'fristpage.html',
})
export class FristpagePage {
  data: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public apiProvider: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FristpagePage');
  }

  response: any;
  buttonn() { //Just a sec

    this.storage.get("mail").then(mail => {
      console.log(mail)
      if (mail != null) {
        this.apiProvider.postData({ user_email: mail }, '/profile_api.php').then(response => {
          console.log(response)
          this.response =  response
          this.storage.set("user_details" , response)
          if (this.response.status) {
            this.response = this.response.payment;
            if (this.response == 0) {
              
              this.navCtrl.push(PayprocessPage)
            }
            else {
              this.navCtrl.push(ChatPage)
            }
          }
        })
      }
      else {
        this.storage.get("home").then(data => {
          console.log(data)
          if (data != null) {
            // this.navCtrl.setRoot(PayprocessPage)
            this.storage.get("family").then(data2 => {
              console.log(data2)
              if (data2 != null) {
                this.storage.get("event").then(data3 => {
                  console.log(data3)
                  if (data3 != null) {
                    this.storage.get("room").then(data4 => {
                      console.log(data4)
                      if (data4 != null) {
                        this.storage.get("book").then(data5 => {
                          console.log(data5)
                          if (data5 != null) {
                            this.storage.get("travel").then(data6 => {
                              console.log(data6)
                              if (data6 != null) {
                                console.log(data6)
                                this.navCtrl.setRoot(PayprocessPage, { tdatas: data6 })
                              } else {
                                this.navCtrl.setRoot(Page11Page, { fifthdatas: data5 })
                              }
                            })
                          } else {
                            this.navCtrl.setRoot(Page3Page, { ldata: data4 })
                          }
                        })
                      } else {
                        this.navCtrl.setRoot(BookuroomPage, { fdatas: data3 })
                      }
                    })


                  } else {
                    this.navCtrl.setRoot(EventPage, { sdatas: data2 })
                  }

                })


              } else {
                console.log(data)
                this.navCtrl.setRoot(Page2Page, { fdatas: data })
              }
            })
          }

          else {
            this.navCtrl.setRoot(HomePage)
          }




        })
      }
    })



  }


}
