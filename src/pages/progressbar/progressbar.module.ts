import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgressbarPage } from './progressbar';

@NgModule({
  declarations: [
    ProgressbarPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgressbarPage),
  ],
})
export class ProgressbarPageModule {}
