import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudyMaterialComponent} from './study-material.component';
import {StudyMaterialRoutingModule} from './study-material-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from "@angular/forms";
import { IonicSelectableModule } from 'ionic-selectable';



@NgModule({
  declarations: [StudyMaterialComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    StudyMaterialRoutingModule,
    IonicSelectableModule
  ]
})
export class StudyMaterialModule { }
