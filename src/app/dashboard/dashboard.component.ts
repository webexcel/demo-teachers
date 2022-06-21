import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { StorageService } from "../service/storage.service";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from "../../environments/environment";

import {TranslateConfigService} from '../service/translate-config.service';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Platform } from '@ionic/angular';
import { DataService } from "../service/data.service";


// import { File } from "@ionic-native/file/ngx";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{


  public appPages = environment.pages;
  
  constructor(private dataservice:DataService,private platform: Platform,  private appMinimize: AppMinimize,private translate: TranslateConfigService, private router: Router, private route: ActivatedRoute, public authservice: AuthService, public storage: StorageService) { 
    this.platform.backButton.subscribe(() => {
      let p = this.storage.get('page')
      if(p=='dashboard'){
        this.appMinimize.minimize();
      } 
    })
  }

  ngOnInit() {
    
    this.dataservice.currentMenustatus.subscribe(index => {
      this.translate.set()
    })
    
    //this.download()
    //this.read()
    
    
  }


  


   

  



 
   go(url){
    this.router.navigate([url])
   }

  

  



}
