import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Page3Page } from '../page3/page3';
import { Page11Page } from '../page11/page11';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EventPage } from '../event/event';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Page2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
})
export class Page2Page {
  firstdatas: any
  fd: any
  year : any = Number(new Date().getFullYear())+50;
  weddate:any;
  params: any
  base64Image: any

  constructor(public navCtrl: NavController,public storage:Storage,public navParams: NavParams, public toastCtrl: ToastController, public formBuilder: FormBuilder, private camera: Camera) {
    this.params = this.formBuilder.group({
      childno: ['', Validators.compose([Validators.required,])],
      spouse: ['', Validators.compose([Validators.required,])],
      // weddate: ['', Validators.compose([Validators.required,])],
      occupation: ['', Validators.compose([Validators.required,])],
      company: ['', Validators.compose([Validators.required,])],
      position: ['', Validators.compose([Validators.required,])],



    })

    // this.firstdatas = navParams.get("fdatas");
    // console.log(this.firstdatas)

    storage.get("event").then(data => {
      if(data != null) {
        this.firstdatas = data
        console.log(this.firstdatas)
      }
      else  {
        this.firstdatas=navParams.get('fdatas')
      
        console.log(this.firstdatas)
      }
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page2Page');
  }
  back(){
    this.navCtrl.pop()
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


  next() {
    if (this.params.valid){
    Object.assign(this.firstdatas, this.params.value )
    Object.assign(this.firstdatas ,  {
      weddate:this.weddate,
      clg_photo:this.clgPhto,
      family_photo:this.fmlyPhto,
      indv:this.ind
    

    })
    console.log(this.firstdatas)
    this.storage.set("family" , this.firstdatas)
    this.navCtrl.push(EventPage, { sdatas: this.firstdatas })
  }
  else {
      this.presentToast("Enter Valid Details")
    }

  }
  clgPhto: any = "";
  hideClg : boolean = false;
  clgPhoto(sourceType) {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.hideClg = true
      this.clgPhto = 'data:image/jpeg;base64,' + imageData;
    
    }, (err) => {
      // Handle error
    
        console.log(err)
    });
  }

  fmlyPhto : any = ""
  hideBtn : boolean = false;
  fmlyPhoto(sourceType) {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.hideBtn = true
      this.fmlyPhto = 'data:image/jpeg;base64,' + imageData;
    
    }, (err) => {
      // Handle error
    
        console.log(err)
    });
  }


  ind : any = ""
  hidein : boolean = false;
  indi(sourceType) {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.hidein = true
      this.ind = 'data:image/jpeg;base64,' + imageData;
    
    }, (err) => {
      // Handle error
    
        console.log(err)
    });
  }

}
