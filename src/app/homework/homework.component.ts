import { Component, OnInit,ViewChild } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import {TranslateConfigService} from '../service/translate-config.service';
import { Router} from '@angular/router';
import { Platform } from '@ionic/angular';
import {AuthService} from "../service/auth.service";
import {LoadingService} from '../service/loading.service';
import {StorageService} from '../service/storage.service';
import { AlertController} from '@ionic/angular';
@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss'],
})
export class HomeworkComponent implements OnInit {
  @ViewChild('portComponent',{static:false}) portComponent: IonicSelectableComponent;
  classs: any[];
  subjects:any[];
  select_datas: any={};
  gethw:any = []
  delete_homework:any;
  cancel:any;
  delete:any;
  constructor(public alertCtrl: AlertController,public storage:StorageService,private platform: Platform, private router: Router,private translate: TranslateConfigService,public loading:LoadingService,public authservice:AuthService) { 
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

  ngOnInit() {
    this.translate.set()
    this.translate.getparam('delete_circulars').then(v=>this.delete_homework=v)
    this.translate.getparam('cancel').then(v=>this.cancel=v)
    this.translate.getparam('delete').then(v=>this.delete=v)
    this.select_datas.s_date = new Date().toISOString();
    this.select_datas.staff_id = this.storage.getjson('teachersDetail')[0]['staff_id']
    this.classs = this.storage.getjson('classlist')
    this.getallsubject()
    this.getSaveHomework()
  }

  toggleItems(status) {
    if(status){
      this.portComponent.toggleItems(false);
      this.portComponent.toggleItems(status); 
      this.confirm() 
    }else{
      this.portComponent.toggleItems(status);
    }
  }

  confirm() {
    this.portComponent.confirm();
    this.portComponent.close();
  }

  classChange(event){
  }

  getSaveHomework(){
    this.loading.present()
    this.authservice.post('getSaveHomework',{staff_id:this.storage.getjson('teachersDetail')[0]['staff_id'],classid:this.authservice.classids()}).subscribe(res=>{
      this.loading.dismissAll()
      if(res['status']){
        this.gethw = res['data']
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }

  getallsubject(){
    this.loading.present()
    this.authservice.get('getallsubject').subscribe(res=>{
      this.loading.dismissAll()
      if(res['status']){
        this.subjects = res['data']
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  } 

  onSubmit(){
    this.loading.present()
    this.authservice.post('saveHomeworkMessage',this.select_datas).subscribe(res=>{
      this.loading.dismissAll()
      if(res['status']){
        this.select_datas.message = ""
        this.getSaveHomework()
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }

  async deletehomework(ID){
    let alert = await this.alertCtrl.create({
     header: this.delete_homework,
     //subTitle: this.name,
     //message:message,
     buttons: [
       {
         text: this.cancel,
         role: 'cancel',
         handler: data => {
           console.log('Cancel clicked');
         }
       },
       {
         text: this.delete,
         handler: data => { 
           this.loading.present()
           this.authservice.post('deletehomework',{id:ID}).subscribe(res=>{
             this.loading.dismissAll()
             this.getSaveHomework()
           },err=>{
             this.loading.dismissAll()
           })
     }
   }
   ]
   });
   await alert.present();
   }

  


  

}
