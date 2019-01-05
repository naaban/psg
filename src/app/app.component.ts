import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Page2Page } from '../pages/page2/page2';
import { FristpagePage } from '../pages/fristpage/fristpage';
import { BookuroomPage } from '../pages/bookuroom/bookuroom';
import { EventPage } from '../pages/event/event';
import { CabsPage } from '../pages/cabs/cabs';
import { ShoppingPage } from '../pages/shopping/shopping';
import { PayprocessPage } from '../pages/payprocess/payprocess';
import { AboutmePage } from '../pages/aboutme/aboutme';
import { Page11Page } from '../pages/page11/page11';
import { ChatPage } from '../pages/chat/chat';
import { AssistancePage } from '../pages/assistance/assistance';
import { FeedbackPage } from '../pages/feedback/feedback';
import { GalleryPage } from '../pages/gallery/gallery';
import { VideoPage } from '../pages/video/video';
import { WelcomePage } from '../pages/welcome/welcome';
import { ContactPage } from '../pages/contact/contact';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any =VideoPage;

  pages: Array<{title: string, component: any , name : any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Welcome', component: WelcomePage, name : "assets/imgs/hand.svg" },
      { title: 'About Me', component: AboutmePage, name : "assets/imgs/nu.svg" },
      { title: 'Event', component: EventPage, name : "assets/imgs/event.svg" },
      { title: 'Gallery', component: GalleryPage, name : "assets/imgs/attach.svg" },
      { title: 'Assistance', component: FeedbackPage, name : "assets/imgs/survey.svg" },
      { title: 'Cab', component: CabsPage, name : "assets/imgs/taxi.svg" },
      { title: 'Shopping', component: ShoppingPage, name : "assets/imgs/shop.svg" },
      // { title: 'About Me', component: HomePage, name : "assets/imgs/agreement.svg" },
      // { title: 'Live Stream', component: HomePage, name : "assets/imgs/live.svg" },
      { title: 'Feedback', component: AssistancePage, name : "assets/imgs/feedback.svg" },
     
      { title: 'Chatbox', component: ChatPage, name : "assets/imgs/group.svg" },

      { title: 'Contact Us', component: ContactPage, name : "assets/imgs/contactus.svg" }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
