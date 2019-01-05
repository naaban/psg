import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CabsPage } from './cabs';

@NgModule({
  declarations: [
    CabsPage,
  ],
  imports: [
    IonicPageModule.forChild(CabsPage),
  ],
})
export class CabsPageModule {}
