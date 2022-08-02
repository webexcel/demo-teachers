import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlashComponent} from './flash.component';
import {FlashRoutingModule} from './flash-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from "@angular/forms";
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [FlashComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FlashRoutingModule,
    IonicSelectableModule
  ]
})
export class FlashModule { }
