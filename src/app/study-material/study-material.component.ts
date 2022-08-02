import { Component, OnInit, ViewChild } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from "../service/auth.service";
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { Base64 } from "@ionic-native/base64/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-study-material',
  templateUrl: './study-material.component.html',
  styleUrls: ['./study-material.component.scss'],
})
export class StudyMaterialComponent implements OnInit {
  ios: any = false
  @ViewChild('portComponent', { static: false }) portComponent: IonicSelectableComponent;
  classs: any[];
  details: any = {}
  error:any = false
  flashlist:any = []

  constructor(public alertCtrl: AlertController,private sanitizer: DomSanitizer,private filePath: FilePath, public base64: Base64, public loading: LoadingService, public authservice: AuthService, public storage: StorageService, private platform: Platform, private router: Router, private fileChooser: FileChooser) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

  ngOnInit() {
    this.ios = this.authservice.isiso()
    this.classs = this.storage.getjson('classlist')
    this.details.staff_code = this.storage.getjson('teachersDetail')[0]['staff_id']
    this.details.date = new Date().toISOString();
    this.details.image = ""
    this.details.type = ""
    this.flashmessage()
  }

  flashmessage(){   
    let flashmes;
   
   this.loading.present()
     this.authservice.post('getflashmessage',{}).subscribe((result) =>{
      this.loading.dismissAll()
     flashmes = result;
     if(flashmes.status){

     this.flashlist = flashmes.data;
     
     }

    
    console.log(this.flashlist)
           
     }, (err) => {
      this.loading.dismissAll()
     });
   }

  toggleItems(status) {
    if (status) {
      this.portComponent.toggleItems(false);
      this.portComponent.toggleItems(status);
      this.confirm()
    } else {
      this.portComponent.toggleItems(status);
    }
  }

  confirm() {
    this.portComponent.confirm();
    this.portComponent.close();
  }

  onSubmit() {
    console.log(this.details)
    this.loading.present()
    this.authservice.post('saveflase',this.details).subscribe(res=>{
      this.loading.dismissAll()
      if(res['status']){
        this.flashmessage()
        this.show("Flash saved  Successfully")
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }

  open() {
    this.fileChooser.open()
      .then(uri => {
        console.log(uri)
        this.filePath.resolveNativePath(uri).then(res => {
          let l: any = res.split('.')
          l = l[l.length - 1].toLowerCase()
          if (l == 'jpg' || l == 'jpeg' || l == 'png') {
            this.details.type = l
            this.error = false
            l = `data:image/${l};base64,`
            this.base64.encodeFile(res).then(res => {
              this.details.image = this.sanitizer.bypassSecurityTrustUrl(l+res.split('ase64,')[1])
            }, err => {
              console.log(err)
            })
          }else{
           this.error = true
          }          
        }, err => {
          console.log(err)
        })
      })
      .catch(e => console.log(e));
  }

  delete(id){
    this.loading.present()
    this.authservice.post('deleteflase',{nid:id}).subscribe(res=>{
      this.loading.dismissAll()
      if(res['status']){
        this.flashmessage()
        this.show("Flash deleted  Successfully")
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }

  async show(msg)
    {
      let alert = await this.alertCtrl.create({
        header:msg,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          }]
      })
      await alert.present();
    }
}
