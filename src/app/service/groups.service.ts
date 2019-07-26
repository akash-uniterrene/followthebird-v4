import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(public api: ApiService) { }

  getgroups(params?: any) {
    let grouplist = [];	
    let seq = this.api.get('groups', params);
  
    // don't have the data yet
    return new Promise(resolve => {
      seq.subscribe((res: any) => {
        grouplist.push(res);
        resolve(grouplist);
      }, err => {
        console.error('ERROR', err);
      });
    });
  }

  create_group(groupInfo: any){
    let seq = this.api.post('create_group', groupInfo);
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      
    }, err => {
      console.error('ERROR', err);
    }); 
    return seq;
  }
    
  edit_group(groupInfo: any){
    let seq = this.api.post('edit_group', groupInfo);
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
   
  getGroupProfile(id:number,params: any){
    let event :any;
    let seq = this.api.get('group-profile/'+id, params);
    // don't have the data yet
    return new Promise(resolve => {
      seq.subscribe((res: any) => {
        event = res;
        resolve(event);
      }, err => {
        console.error('ERROR', err);
      });
    });
  }

}
