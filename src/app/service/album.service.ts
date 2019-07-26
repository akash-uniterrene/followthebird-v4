import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(public api: ApiService) { }
  
  getAlbum(user_id:number,params?: any){
    let album :any;
    let seq = this.api.get('album/'+user_id, params);
    return new Promise(resolve => {
      seq.subscribe((res: any) => {
        album = res;
        resolve(album);
      }, err => {
        console.error('ERROR', err);
      });
    });
  }

}
