import { Component, OnInit,ViewChild } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import {TranslateConfigService} from '../service/translate-config.service';
import {AuthService} from "../service/auth.service";
import {StorageService} from '../service/storage.service';
import {LoadingService} from '../service/loading.service';
import { Router} from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController} from '@ionic/angular';


@Component({
  selector: 'app-circulars',
  templateUrl: './circulars.component.html',
  styleUrls: ['./circulars.component.scss'],
})
export class CircularsComponent implements OnInit {
  classs: any;
  select_datas: any={};
  senditems:any=[];
  grpmes:any = [];
  delete_circulars:any;
  cancel:any;
  send_circulars:any;
  send:any;
  delete:any;
  @ViewChild('portComponent',{static:false}) portComponent: IonicSelectableComponent;

  constructor(public alertCtrl: AlertController,private platform: Platform, private router: Router,private translate: TranslateConfigService,public authservice:AuthService, public storage:StorageService, public loading:LoadingService) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
   }

  ngOnInit() {
    this.translate.set()
    this.translate.getparam('delete_circulars').then(v=>this.delete_circulars=v)
    this.translate.getparam('cancel').then(v=>this.cancel=v)
    this.translate.getparam('send_circulars').then(v=>this.send_circulars=v)
    this.translate.getparam('send').then(v=>this.send=v)
    this.translate.getparam('delete').then(v=>this.delete=v)
    this.select_datas.s_date = new Date().toISOString();
    this.select_datas.staff_id = this.storage.getjson('teachersDetail')[0]['staff_id']
    this.classs = this.storage.getjson('classlist')
    this.getgroupMessage()
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
    
   // console.log(this.select_datas)
  }

  onSubmit(){
    this.loading.present()
    this.authservice.post('saveMessage',this.select_datas).subscribe(res=>{
      this.loading.dismissAll()
      if(res['status']){
        this.select_datas.message = ""
        this.getgroupMessage()
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }

  getgroupMessage(){
    this.loading.present()
    this.authservice.post('getgroupMessage',{staff_id:this.storage.getjson('teachersDetail')[0]['staff_id'],classid:this.authservice.classids()}).subscribe(res=>{
      this.loading.dismissAll()
      if(res['status']){
        this.grpmes = res['data']
        this.senditems = res['senditem']
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }

  async deletecirculars(ID){
   let alert = await this.alertCtrl.create({
    header: this.delete_circulars,
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
          this.authservice.post('deletecirculars',{id:ID}).subscribe(res=>{
            this.loading.dismissAll()
            this.getgroupMessage()
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
     header: this.send_circulars,
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
           this.authservice.post('movegrouptofinal',{ids:ID}).subscribe(res=>{
             this.loading.dismissAll()
             this.getgroupMessage()
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
      id.push({id:this.grpmes[i]['ID']})
    }
    this.movegrouptofinal(id)
   }


}
