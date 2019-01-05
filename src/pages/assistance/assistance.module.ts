import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssistancePage } from './assistance';

@NgModule({
  declarations: [
    AssistancePage,
  ],
  imports: [
    IonicPageModule.forChild(AssistancePage),
  ],
})
export class AssistancePageModule {}
