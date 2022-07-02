import { Component, OnInit } from '@angular/core';
import {TranslateConfigService} from '../service/translate-config.service';
import { Router} from '@angular/router';
import { Platform } from '@ionic/angular';
import {AuthService} from "../service/auth.service";
import {LoadingService} from '../service/loading.service';
import {StorageService} from '../service/storage.service';

@Component({
  selector: 'app-personalized',
  templateUrl: './personalized.component.html',
  styleUrls: ['./personalized.component.scss'],
})
export class PersonalizedComponent implements OnInit {
  classs: any[];
  students:any[];
  select_datas: any={};

  constructor(public storage:StorageService,private platform: Platform, private router: Router,private translate: TranslateConfigService,public loading:LoadingService,public authservice:AuthService) { 
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

  ngOnInit() {
    this.translate.set()
    this.select_datas.s_date = new Date().toISOString();
    this.classs = this.storage.getjson('classlist')
    this.select_datas.type='PERSONALIZE'
  }

  classChange(event){
    this.select_datas.student=[]
   this.getStudentsByClass(event.value['id'])
  }

  getStudentsByClass(class_Id){
    let data ={
      class_Id : class_Id
    }
    this.loading.present()
    this.authservice.post('getStudentsByClass',data).subscribe(res=>{
      this.loading.dismissAll()
      if(res['status']){
        this.students = res['data']
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }

  getlist(){
    
  }

  onSubmit(){
    if(this.select_datas.student.length){
      console.log(this.select_datas)
      this.loading.present()
      this.authservice.post('newpersonalsms',this.select_datas).subscribe(res=>{
        this.loading.dismissAll()
        if(res['status']){
          this.select_datas.message = ""
          this.getlist()
        }
      },err=>{
        this.loading.dismissAll()
        console.log(err)
      })
    }
    
  }


}
