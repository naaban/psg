import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookuroomPage } from './bookuroom';

@NgModule({
  declarations: [
    BookuroomPage,
  ],
  imports: [
    IonicPageModule.forChild(BookuroomPage),
  ],
})
export class BookuroomPageModule {}
