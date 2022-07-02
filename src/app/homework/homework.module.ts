import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeworkComponent} from './homework.component';
import {HomeworkRoutingModule} from './homework-routing.module';
import { IonicModule } from '@ionic/angular';
import { TranModule } from "../tran.module";
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [HomeworkComponent],
  imports: [
    CommonModule,
    HomeworkRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableModule,
    FormsModule
  ],
})
export class HomeworkModule { }
