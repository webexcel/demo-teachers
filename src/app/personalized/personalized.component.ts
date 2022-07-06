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
  selector: 'app-personalized',
  templateUrl: './personalized.component.html',
  styleUrls: ['./personalized.component.scss'],
})
export class PersonalizedComponent implements OnInit {
  @ViewChild('portComponent',{static:false}) portComponent: IonicSelectableComponent;
  classs: any[];
  students:any[];
  select_datas: any={};
  senditems:any=[];
  grpmes:any = [];
  delete_personalized:any;
  cancel:any;
  send_personalized:any;
  send:any;
  delete:any;

  constructor(public alertCtrl: AlertController,public storage:StorageService,private platform: Platform, private router: Router,private translate: TranslateConfigService,public loading:LoadingService,public authservice:AuthService) { 
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

  ngOnInit() {
    this.translate.set()
    this.translate.getparam('delete_personalized').then(v=>this.delete_personalized=v)
    this.translate.getparam('cancel').then(v=>this.cancel=v)
    this.translate.getparam('send_personalized').then(v=>this.send_personalized=v)
    this.translate.getparam('send').then(v=>this.send=v)
    this.translate.getparam('delete').then(v=>this.delete=v)
    this.select_datas.s_date = new Date().toISOString();
    this.classs = this.storage.getjson('classlist')
    this.select_datas.type='PERSONALIZE'
    this.select_datas.staff_id = this.storage.getjson('teachersDetail')[0]['staff_id']
    this.getlist()
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

  getlist(){
    this.loading.present()
    this.authservice.post('getpersonalmessagelist',{staff_id:this.storage.getjson('teachersDetail')[0]['staff_id'],type:"PERSONALIZE",classid:this.authservice.classids()}).subscribe(res=>{
      this.loading.dismissAll()
      if(res['status']){
        this.grpmes = res['data']
        this.senditems = res['senditem']
      }else{
        this.grpmes = []
        this.senditems = []
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }

  onSubmit(){
    if(this.select_datas.student.length){
      console.log(this.select_datas)
      this.loading.present()
      this.authservice.post('newpersonalsms',this.select_datas).subscribe(res=>{
        this.loading.dismissAll()
        if(res['STATUS']){
          this.select_datas.message = ""
          this.getlist()
        }
      },err=>{
        this.loading.dismissAll()
        console.log(err)
      })
    }
    
  }
  async deletecirculars(ID){
    let alert = await this.alertCtrl.create({
     header: this.delete_personalized,
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
           this.authservice.post('getdeletepersonalmessagelist',{ID:ID}).subscribe(res=>{
             this.loading.dismissAll()
             this.getlist()
           },err=>{
             this.loading.dismissAll()
           })
     }
   }
   ]
   });
   await alert.present();
   }
  async movegrouptofinal(ID){
    let alert = await this.alertCtrl.create({
     header: this.send_personalized,
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
         text: this.send,
         handler: data => { 
           this.loading.present()
           this.authservice.post('movepersonaltofinal',{ids:ID,msgtype:"PERSONALIZE"}).subscribe(res=>{
             this.loading.dismissAll()
             this.getlist()
           },err=>{
             this.loading.dismissAll()
           })
     }
   }
   ]
   });
   await alert.present();
   }

   moveFinalgroupAll(){
    let id = []
    for (let i = 0; i < this.grpmes.length; i++) {
      id.push({ID:this.grpmes[i]['ID']})
    }
    this.movegrouptofinal(id)
   }


}
