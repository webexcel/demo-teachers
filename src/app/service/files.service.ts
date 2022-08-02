import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from "@ionic-native/file/ngx";
import {AuthService} from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class FilesService {
  
    constructor(private file: File,private platform: Platform,private auth: AuthService) {
        this.platform.ready().then(() => {
            this.checkdir()
        })
     }
     

     checkdir(){
        try {
          console.log(this.file.externalDataDirectory+'schooltree')
          this.file.checkDir(this.file.externalDataDirectory, 'schooltree').then(response => {
            console.log('Directory exists'+response);
          }).catch(err => {
            console.log('Directory doesn\'t exist'+JSON.stringify(err));
            this.file.createDir(this.file.externalDataDirectory, 'schooltree', false).then(response => {
              console.log('Directory create'+JSON.stringify(response));
            }).catch(err => {
              console.log('Directory no create'+JSON.stringify(err));
            }); 
          });
        } catch (error) {
            console.log(error)
        }
      }

      checkfile(filename){
        return this.file.checkFile(this.file.externalDataDirectory,'schooltree/'+filename)
      }

      filepath(){
        return (this.file.externalDataDirectory+'schooltree/').replace(/file:\/\//g, '')
      }

  
      read(file){
        return this.file.readAsDataURL(this.file.externalDataDirectory, 'schooltree/'+file)
      }

      removefile(file){
        try {
          this.file.removeFile(this.file.externalDataDirectory, 'schooltree/'+file).then(res=>{
            console.log(res)
          },err=>{
            console.log(err)
          })
        } catch (error) {
          
        }
      }
   
    
   
     b64toBlob(b64Data, contentType) {
       contentType = contentType || '';
       var sliceSize = 512;
       var byteCharacters = atob(b64Data);
       var byteArrays = [];
   
       for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
         var slice = byteCharacters.slice(offset, offset + sliceSize);
   
         var byteNumbers = new Array(slice.length);
         for (var i = 0; i < slice.length; i++) {
           byteNumbers[i] = slice.charCodeAt(i);
         }
   
         var byteArray = new Uint8Array(byteNumbers);
   
         byteArrays.push(byteArray);
       }
   
       var blob = new Blob(byteArrays, {type: contentType});
       return blob;
     }


}