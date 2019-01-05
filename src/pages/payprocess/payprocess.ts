import { Component } from '@angular/core';
import { NewTransactionPage } from '../instamojo/new_transaction';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ShoppingPage } from '../shopping/shopping';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { ChatPage } from '../chat/chat';
/**
 * Generated class for the PayprocessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var Instamojo: any;
@IonicPage()
@Component({
  selector: 'page-payprocess',
  templateUrl: 'payprocess.html',
})
export class PayprocessPage {

 loading:any
lastdatas:any
response:any
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController,public storage: Storage ,  public apiProvider : ApiProvider,public navParams: NavParams, public toastCtrl:ToastController) {
    // fifthdatas
    // Instamojo.open("https://imjo.in/sjMUFN"); 
  
   
storage.get("user_details").then(data => {
  console.log(data)
  if(data != null) {
    this.lastdatas = data
    console.log(this.lastdatas)
  }
  else  {
    storage.get("mail").then(mail => {
      apiProvider.postData({user_email : mail} , '/profile_api.php').then(profile => {
        console.log(profile)
        this.lastdatas=profile
      })
    })
    
  }
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayprocessPage');
  }
  pay(){
    this.next()
    
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

  submit(){

    // let data ={
    //  name : this.lastdatas.name,
    //  date : this.lastdatas.fdate,
    //  phone : this.lastdatas.phone,
    //  email :this.lastdatas.email,
    //  address : this.lastdatas.address,
    //  alumni_dept :this.lastdatas.fdept,
    //  achievement :this.lastdatas.achive,
    //  spouse_name : this.lastdatas.spouse,
    //  childrens :this.lastdatas.childno,
    //  wed_date : this.lastdatas.weddate,
    //  occupation : this.lastdatas.occupation,
    //  company : this.lastdatas.company,
    //  current_position : this.lastdatas.position,
    //  travel_mode : this.lastdatas.modetravel,
    //  destination_date : this.lastdatas.dDA,
    //  destination_time : this.lastdatas.tDA,
    //  departure_date : this.lastdatas.dD,
    //  departure_time: this.lastdatas.tD,
    //  food_type : this.lastdatas.vegg,
    //  smoking : this.lastdatas.smoking,
    //  liquor :this.lastdatas.liq,
    //  clg_photo : this.lastdatas.clg_photo,
    //  family_photo :this.lastdatas.family_photo,
    //  room_name : this.lastdatas.room_name,
    //  catagory : this.lastdatas.category,
    //  price :this.lastdatas.price
    //   }
    // // Object.assign(this.lastdatas , data)
    // console.log(data)
    // this.apiProvider.postData(data,'about_api.php').then( data=>{
    //   console.log(data)
    //   this.response=data
    //   if(this.response.status==true){
    //     this.storage.get("tempmail").then(mail => {
    //       console.log(mail)
    //       this.storage.set("mail" , mail)
    //       this.storage.remove("tempmail")
        
    //     })
    //     this.storage.clear()
    //     this.presentToast("User Created Successfully")
      this.navCtrl.setRoot(ChatPage )
     
    // }
    // })
  }




  next(){

    // let data ={
    //  name : this.lastdatas.name,
    //  date : this.lastdatas.fdate,
    //  phone : this.lastdatas.phone,
    //  email :this.lastdatas.email,
    //  address : this.lastdatas.address,
 
    //  alumni_dept :this.lastdatas.fdept,
    //  achievement :this.lastdatas.achive,
    //  spouse_name : this.lastdatas.spouse,
    //  childrens :this.lastdatas.childno,
    //  wed_date : this.lastdatas.weddate,
    //  occupation : this.lastdatas.occupation,
    //  company : this.lastdatas.company,
    //  current_position : this.lastdatas.position,
    //  travel_mode : this.lastdatas.modetravel,
    //  destination_date : this.lastdatas.dDA,
    //  destination_time : this.lastdatas.tDA,
    //  departure_date : this.lastdatas.dD,
    //  departure_time: this.lastdatas.tD,
    //  food_type : this.lastdatas.vegg,
    //  smoking : this.lastdatas.smoking,
    //  liquor :this.lastdatas.liq,
    //  clg_photo : this.lastdatas.clg_photo,
    //  family_photo :this.lastdatas.family_photo,
    //  room_name : this.lastdatas.room_name,
    //  catagory : this.lastdatas.category,
    //  price :this.lastdatas.price
    //   }
    // // Object.assign(this.lastdatas , data)
    // console.log(data)
    // this.apiProvider.postData(data,'about_api.php').then( data=>{
    //   console.log(data)
    //   this.response=data
    //   if(this.response.status) {
    //     this.storage.get("tempmail").then(mail => {
    //       this.storage.set("mail" , mail)
    //       this.storage.remove("tempmail")

    //     })
  
        this.newTransaction()
    //   }
    //   else {
    //     this.presentToast("Something went wrong. Please try again")
    //   }
      
    // })
  }

  newTransaction() {
    this.navCtrl.push(NewTransactionPage,{
      pdatas: this.lastdatas,
    });
    
  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div >
       <ion-row class="loadingBar">
         <ion-col>
         <img class="image" src="../../assets/imgs/14.jpg" alt="" width="120" height="120">
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
