import { Component, OnInit } from '@angular/core';
import {TranslateConfigService} from '../service/translate-config.service';
import { StorageService } from "../service/storage.service";
import { DataService } from "../service/data.service";
import { Router} from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  laun:any;
  constructor(private platform: Platform, private router: Router,private translate: TranslateConfigService,private storage:StorageService, private dataservice:DataService) { 
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

  ngOnInit() {
    this.translate.set()
    this.laun = this.storage.get('laun')
    if(!this.laun){
      this.laun = 'en'
    }
  }

  save(){
    this.storage.add('laun',this.laun)
    this.translate.set()
    this.dataservice.changeMenustatus(true)
  }

}
