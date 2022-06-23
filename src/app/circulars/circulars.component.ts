import { Component, OnInit } from '@angular/core';
import {TranslateConfigService} from '../service/translate-config.service';
import {AuthService} from "../service/auth.service";
import {StorageService} from '../service/storage.service';
import {LoadingService} from '../service/loading.service';
import { Router} from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-circulars',
  templateUrl: './circulars.component.html',
  styleUrls: ['./circulars.component.scss'],
})
export class CircularsComponent implements OnInit {
  classs: any[];
  select_datas: any={};

  constructor(private platform: Platform, private router: Router,private translate: TranslateConfigService,public authservice:AuthService, public storage:StorageService, public loading:LoadingService) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
   }

  ngOnInit() {
    this.translate.set()
    this.classs = [
      {
        id:1,
        name:"PREKG-A"
      },
      {
        id:2,
        name:"PREKG-B"
      },
      {
        id:3,
        name:"PREKG-C"
      }
    ]
  }


  classChange(event){

  }

  onSubmit(){
    console.log(this.select_datas)
  }


}
