import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VideoPlayer } from '@ionic-native/video-player';
import { FristpagePage } from '../fristpage/fristpage';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
datas:any
  constructor(public navCtrl: NavController,public apiProvider:ApiProvider, private videoPlayer: VideoPlayer,public navParams: NavParams) {
 
    // private videoPlayer: VideoPlayer,
    // this.videoPlayer.play('file:///android_asset/www/movie.mp4').then(() => {
    //   console.log('video completed');
    //  }).catch(err => {
    //   console.log(err);
    //  });

 this.get()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  
  get(){
    this.apiProvider.getData('video_api.php').then(data=> {
       console.log(data)
     this.datas=data
       console.log(this.datas)
   
     
     })
   }

  next(){
    this.navCtrl.setRoot(FristpagePage)
  }

}
