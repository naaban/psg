import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayprocessPage } from './payprocess';

@NgModule({
  declarations: [
    PayprocessPage,
  ],
  imports: [
    IonicPageModule.forChild(PayprocessPage),
  ],
})
export class PayprocessPageModule {}
