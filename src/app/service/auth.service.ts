import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBaseUrl:any = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }


  post(url,data){
     return this.http.post(`${this.apiBaseUrl}${url}`,data,{})
  }

  get(url){
    return this.http.get(`${this.apiBaseUrl}${url}`,{})
  }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
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
