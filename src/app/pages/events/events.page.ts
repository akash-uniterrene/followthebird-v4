import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../service/events.service';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  eventzone: string = "suggested";
	eventLists: any = [];
	eventCategories: any = [];
	private imageURL = "https://followthebirds.com/content/uploads/";
  constructor(public events: EventsService, public user: UserService, public router: Router ) { this.loadEvent('suggested'); }

  ngOnInit() {
    this.loadEvent('going');
    this.loadEvent('interested');
    this.loadEvent('invited');
    this.loadEvent('manage');
    this.loadEventsCategories();
  }

  loadEvent(type){
    this.events.getevents({type: type,id:parseInt(localStorage.getItem('user_id'))})
    .then(data => {
		this.eventLists[type] = data[0];
    });
  }

  loadEventsCategories(){
    this.events.geteventCategories()
    .then(data => {
		this.eventCategories = data[0];
    });
  }
  
  viewEvent(eventProfile){
    this.router.navigate(['/event-profile',{eventProfile:eventProfile.event_id}]);
  }
  
  createEvent(){
    this.router.navigate(['/event-create']);
  }
  
  eventInterestAction(type,event_id){
	  this.connectAction(type,event_id);
  }

  eventUninterestAction(type,event_id){
	  this.connectAction(type,event_id);
  }
  
  
  connectAction(type,event_id,uid?: any){
    let params :any = {
      'do': type,
      'id': event_id,
      'uid': uid,
      'my_id' : localStorage.getItem('user_id')
    };
    this.user.connection(params).subscribe((resp) => {						
      
    }, (err) => {
    
    });
  }


}
