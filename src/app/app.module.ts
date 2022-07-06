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
import { JwtInterceptor } from './service/jwt.interceptor';













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
  }, StatusBar, SplashScreen,AppMinimize,Device],
  bootstrap: [AppComponent],
})
export class AppModule { }
