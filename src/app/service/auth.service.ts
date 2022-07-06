import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBaseUrl:any = environment.apiBaseUrl;
  constructor(private http:HttpClient,private storage:StorageService) { }


  post(url,data){
    if(url!='userLogin'){
      url = url+'/'+this.storage.getjson('teachersDetail')[0]['dbname']
    }
     return this.http.post(`${this.apiBaseUrl}${url}`,data,{})
  }

  get(url){
    url = url+'/'+this.storage.getjson('teachersDetail')[0]['dbname']
    return this.http.get(`${this.apiBaseUrl}${url}`,{})
  }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

  classids(){
    let c = this.storage.getjson('classlist')
    let l = []
    for (let i = 0; i < c.length; i++) {
      l.push( c[i]['id']);
    }

    return l.join(',');
  }

  pdfto64(pdf){
    let promise = new Promise((resolve, reject) => {
    let httpHeaders = new HttpHeaders()
    .set('type', 'application/pdf')
    let options = {
        headers: httpHeaders
    };
 this.http.get(
      pdf,
      options).toPromise()
      .then(
        res => {console.log(res)},
        err=>{console.log(err)})
    
    })
      return promise
      
  }
}
