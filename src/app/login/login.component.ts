import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
import { Device } from '@ionic-native/device/ngx';
import { AuthService } from '../service/auth.service';
import { StorageService } from "../service/storage.service";
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../service/data.service";
import {TranslateConfigService} from '../service/translate-config.service';
import { LoadingService } from "../service/loading.service";
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logo: any = environment.login_logo;
 
  authForm: any = {}
  app_versionCode: any = environment.app_versionCode;



  usernametr:any;
  passwordtr:any;

  
  constructor(private platform: Platform,  private appMinimize: AppMinimize,public loading:LoadingService,private translate: TranslateConfigService,private dataservice: DataService, private router: Router, private route: ActivatedRoute, private device: Device, public authservice: AuthService, public storage: StorageService, private alertCtrl: AlertController,) {
    this.platform.backButton.subscribe(() => {
      let p = this.storage.get('page')
      if(p=='login'){
        this.appMinimize.minimize();
      }      
    })
  }

  

  ngOnInit() {
    this.translate.set()
    this.translate.getparam('username').then(v=>this.usernametr=v)
    this.translate.getparam('password').then(v=>this.passwordtr=v)
  }


  replaceholderusername(t){
    t.target.placeholder=this.usernametr
  }

  replaceholderpassword(t){
    t.target.placeholder=this.passwordtr
  }



  submitForm() {
    this.loading.present();
    this.app_versionCode = environment.app_versionCode;

    let value: any = {
   platform_type:this.device.platform,
   manufacturer_name:this.device.manufacturer,
   manufacturer_model:this.device.cordova,
   os_version:this.device.version,
   deviceid:this.device.serial,
      mobile_no:this.authForm.username,
      app_version_code: this.app_versionCode
    }
    this.authservice.post('mobileinstallsnew', value).subscribe(result => {
      
      this.loading.dismissAll()
    }, err => {
      this.loading.dismissAll()
    })
  }


 






  


}
