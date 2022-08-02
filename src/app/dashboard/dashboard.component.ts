import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { StorageService } from "../service/storage.service";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from "../../environments/environment";

import {TranslateConfigService} from '../service/translate-config.service';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Platform } from '@ionic/angular';
import { DataService } from "../service/data.service";
import {LoadingService} from '../service/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  ios:any=false
teachersDetail:any = this.storage.getjson('teachersDetail')

  public appPages = environment.pages;
  
  constructor(private dataservice:DataService,private platform: Platform,  private appMinimize: AppMinimize,private translate: TranslateConfigService, private router: Router, private route: ActivatedRoute, public authservice: AuthService, public storage: StorageService,public loading:LoadingService) { 
    this.platform.backButton.subscribe(() => {
      let p = this.storage.get('page')
      if(p=='dashboard'){
        this.appMinimize.minimize();
      } 
    })
  }

  ngOnInit() {
    this.ios=this.authservice.isiso()
    this.dataservice.currentMenustatus.subscribe(index => {
      this.translate.set()
    })
    this.getosversion()
    
  }

   go(url){
    this.router.navigate([url])
   }

   

   getosversion(){
    this.loading.present()
    this.authservice.get('getosversion').subscribe(res=>{
      this.loading.dismissAll()
      if(res['status']){
        if(res['data'].length>0){
          if(res['version_code']>environment.version){
            if(this.platform.is('ios')){
              environment.packageid
            }
            if(this.platform.is('android')){
              environment.package
            }
          }
        }
      }
    },err=>{
      this.loading.dismissAll()
     
      console.log(err)
    })
   }

}
