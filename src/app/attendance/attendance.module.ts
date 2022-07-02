import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttendanceComponent} from './attendance.component';
import {AttendanceRoutingModule} from './attendance-routing.module';
import { IonicModule } from '@ionic/angular';
import { TranModule } from "../tran.module";
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [AttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableModule,
    FormsModule
  ],
})
export class AttendanceModule { }
