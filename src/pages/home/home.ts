import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Page2Page } from '../page2/page2';
import { ApiProvider } from '../../providers/api/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PayprocessPage } from '../payprocess/payprocess';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dataInicial:any
  params:any
  dept:any
  Date:any

  month:any
  date:any
  years:any
  

  response:any
  demail:any
  datas:any
  year : any = Number(new Date().getFullYear())+50;

  constructor(public navCtrl: NavController,public apiProvider : ApiProvider,public storage: Storage, public navParams: NavParams ,public toastCtrl: ToastController,  public formBuilder: FormBuilder) {
    this.params = this.formBuilder.group({

        email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
        // name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3), Validators.maxLength(30)])],
         phone: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
        name:['', Validators.compose([Validators.required,])],
        // phone:['', Validators.compose([Validators.required,])],
        // email:['', Validators.compose([Validators.required,])],
        address:['', Validators.compose([Validators.required,])],
        // achive:['', Validators.compose([Validators.required,])],
        // password: ['', Validators.compose([Validators.required,])],
  

        //  email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
        // Zone: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
        // pincode: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
  
      })
this.get()
// this.email()

      // storage.get("home").then(data => {
      //   if(data != null) {
      //     this.data = data
      //     console.log(this.data)
      //   }
      //   else  {
      //     this.data=navParams.get('family')
      //     console.log(this.data)
      //   }
      // })

    
  }
  dateChanged(event) {
    console.log(event)
  }
  data :  any = {};
  email(event){
    // 
    if (this.params.valid){
      Object.assign(this.data ,  this.params.value)
      Object.assign(this.data ,  {
        fdept:this.dept,
        // fdate:this.date+"/"+this.month+"/"+this.years
fdate:this.date
      })
      console.log(this.month)

      this.storage.set("home" , this.data)


      this.storage.set("tempmail" , this.data.email)
     


      // this.data=navParams.get('family')
      //     console.log(this.data)
    
    this.navCtrl.push(Page2Page ,{fdatas: this.data})
    }
    else {
        this.presentToast("Enter Valid Email or Phone no")
      }

  }


  get(){
    this.apiProvider.getData('dept_api.php').then(data=> {
       console.log(data)
     this.datas=data
       console.log(this.datas)
   
     
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



next(){
  console.log(this.params.value)
  let demail ={
email:this.params.value.email
}
this.storage.set("tempmail" , this.params.value.email)
 console.log(demail)
    this.apiProvider.postData(demail,'email_api.php').then( data=>{
      console.log(data)
      this.response=data
      if(this.response.status==true){
        // this.storage.clear()
       
        this.email(event)
       
      // this.navCtrl.setRoot(ChatPage)
     
    }
    else{
      this.presentToast("User Register Already")
      // this.presentToast("User Register Alredy")
    }
    })
}




//   @ViewChild('datePicker') datePicker;
//   open() {
//       if (!this.dataInicial) {
//           this.dataInicial = new Date().toJSON().split('T')[0];
//           setTimeout(() => {
//               this.datePicker.open();
//           }, 50)
//       } else {
//           this.datePicker.open();
//       }

//   }

}
