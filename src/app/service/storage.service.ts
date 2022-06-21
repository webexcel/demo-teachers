import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
        
  }

  add(key, data){
      localStorage.setItem(key,data)
  }

  addjson(key, data){
      localStorage.setItem(key,JSON.stringify(data))
  }

  get(key){
      return localStorage.getItem(key)
  }

  getjson(key){
      return JSON.parse(localStorage.getItem(key))
  }

  remove(key){
      localStorage.removeItem(key)
  }

  clear(){
      localStorage.clear()
  }
}
