import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AlertController} from '@ionic/angular';
import {TranslateConfigService} from '../service/translate-config.service';


@Injectable({ providedIn: "root" })
export class JwtInterceptor implements HttpInterceptor {
    cancel:any;
    constructor(public alertCtrl: AlertController,private translate: TranslateConfigService ){
        this.translate.getparam('cancel').then(v=>this.cancel=v)
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        
        return next.handle(request)
        .pipe(tap ((r)=>{
            console.log(r)
            if(r['status'] != undefined){
                if(!r['status']){
                    this.getmsg(r)
                }
            }
            if(r['STATUS'] != undefined){
                if(!r['STATUS']){
                    this.getmsg(r)
                }
            }
            // if(result['body'] != undefined){
            //     if(result['body']['statusCode'] != undefined){
            //         if(result['body']['statusCode']!=200 && result['body']['statusCode']!=100){
            //             if(result['body']['message']!=undefined){
                           
            //             }
            //         }
            //     }
            // }
        },(error)=>{
           
            // if(error['error']['message']=='Token error: jwt expired' || error['error']['message']=='Unauthorized' ){
            //     sessionStorage.clear()
            //     location.reload();
            // }
            //console.log(error) 
        }),finalize(()=>{
           
        }));
    }

 getmsg(r){
    if(r['status'] != undefined){
      
            this.show(r['message'])
        
    }
    if(r['MESSAGE'] != undefined){
    
            this.getmsg(r['MESSAGE'])
        
    }
 }

    async show(msg)
    {
      let alert = await this.alertCtrl.create({
        header:msg,
        buttons: [
          {
            text: this.cancel,
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          }]
      })
      await alert.present();
    }
}