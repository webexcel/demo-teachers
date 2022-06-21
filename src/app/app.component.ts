import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from "./service/storage.service";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '../environments/environment';
import { Router} from '@angular/router';
import { DataService } from "./service/data.service";
import { setTheme } from 'ngx-bootstrap/utils';
import {TranslateConfigService} from './service/translate-config.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public fireBaseRegistrationID: any;
  public getStudentDetails: any = [];
  public app_versionCode: any;
  public storeValues: any;
  public sName: any;
  public badgeNumber: number;
  public disPlayStudentDetail: any = [];
  public index:any = false
  public appPages = environment.pages;
  loadingconfig:any = {
    "bgsColor": environment.color,
    "bgsOpacity": 0.5,
    "bgsPosition": "bottom-right",
    "bgsSize": 60,
    "bgsType": "ball-spin-clockwise",
    "blur": 5,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": environment.color,
    "fgsPosition": "center-center",
    "fgsSize": 60,
    "fgsType": "cube-grid",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(40, 40, 40, 0.8)",
    "pbColor": environment.color,
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": false,
    "text": "Please wait",
    "textColor": "#FFFFFF",
    "textPosition": "center-center",
    "maxTime": -1,
    "minTime": 300
  }
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor( private translate: TranslateConfigService,private dataservice:DataService, public router:Router,private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,  private storage:StorageService) {
      setTheme('bs4')
      router.events.subscribe(val => {
        this.storage.remove('page')
        switch (router.url.replace('/','')) {
          case 'dashboard':
            this.storage.add('page','dashboard')  
          break;
          case 'login':
            this.storage.add('page','login')  
          break;
          default:
            this.storage.remove('page')
        }
      });
      // this.platform.backButton.subscribe(() => {
      //   this.appMinimize.minimize();
      // })

   
    this.initializeApp();

  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.checkfile();
      this.splashScreen.hide();
      
    });

    this.dataservice.currentMenustatus.subscribe(index => {
      this.index = index
      this.translate.set()
      this.translate.getparam('loader_msg').then(v=>this.loadingconfig.text = v)
    })

    
    this.disPlayStudentDetail =  this.storage.getjson('studentDetail')
    if(this.disPlayStudentDetail){
      this.dataservice.changeMenustatus(true)
    }else{
      this.dataservice.changeMenustatus(false)
    }
    
  

    

    
    
  }

  

 


    



  logout() {
    let laun = this.storage.get('laun')
    this.storage.clear()
    if(laun){
      this.storage.add('laun',laun)
      this.translate.set()
    }
    this.index = false;
    this.router.navigate(['login']);
  }
}
