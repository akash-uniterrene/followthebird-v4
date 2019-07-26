import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(public api: ApiService) { }
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  getevents(params?: any) {
    let eventlist = [];	
    let seq = this.api.get('events', params);
  
    // don't have the data yet
    return new Promise(resolve => {
      seq.subscribe((res: any) => {
        eventlist.push(res);
        resolve(eventlist);
      }, err => {
        console.error('ERROR', err);
      });
    });
    }
    
    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    geteventCategories(params?: any) {
      let categories = [];	
      let seq = this.api.get('events_categories', params);
    
      // don't have the data yet
      return new Promise(resolve => {
        seq.subscribe((res: any) => {
          categories.push(res);
          resolve(categories);
        }, err => {
          console.error('ERROR', err);
        });
      });
    }
    
    getEventProfile(id:number,params: any){
      let event :any;
      let seq = this.api.get('event-profile/'+id, params);
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
    
    create_event(cventInfo: any){
    let seq = this.api.post('create_event', cventInfo);
  
      seq.subscribe((res: any) => {
        // If the API returned a successful response, mark the user as logged in
        
      }, err => {
        console.error('ERROR', err);
      });
  
      return seq;
    }
}
