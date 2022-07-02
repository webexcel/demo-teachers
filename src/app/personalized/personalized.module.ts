import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PersonalizedComponent} from './personalized.component';
import {PersonalizedRoutingModule} from './personalized-routing.module';
import { IonicModule } from '@ionic/angular';
import { TranModule } from "../tran.module";
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from "@angular/forms";




@NgModule({
  declarations: [PersonalizedComponent],
  imports: [
    CommonModule,
    PersonalizedRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableModule,
    FormsModule
  ]
})
export class PersonalizedModule { }
