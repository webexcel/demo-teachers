import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CircularsComponent} from './circulars.component';
import {CircularsRoutingModule} from './circulars-routing.module';
import { IonicModule } from '@ionic/angular';
import { TranModule } from "../tran.module";
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [CircularsComponent],
  imports: [
    CommonModule,
    CircularsRoutingModule,
    IonicModule,
    TranModule,
    AccordionModule.forRoot(),
    IonicSelectableModule,
    FormsModule
  ],
})
export class CircularsModule { }
