import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS  } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranModule } from "./tran.module";
import { NgxUiLoaderModule } from "ngx-ui-loader";



//service
import {LoadingService} from './service/loading.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Device } from '@ionic-native/device/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import {Base64} from "@ionic-native/base64/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';
import { JwtInterceptor } from './service/jwt.interceptor';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';













@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, BrowserAnimationsModule,TranModule,

              
                  NgxUiLoaderModule
   
  ],
  exports: [
    
],
  providers: [LoadingService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }, StatusBar, SplashScreen,AppMinimize,Device,FileChooser,Base64,FilePath,Media,File,InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule { }
