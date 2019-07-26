import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { EventsService } from '../../service/events.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  private event : any = {
	  event_title:'',
	  event_location:'',
	  event_start_date:'',
	  event_end_date:'',
	  event_privacy:'',
	  event_description:'',
	  my_id:localStorage.getItem('user_id'),
  };
  public eventCategories : any = [];
  constructor(
    public events: EventsService,
    public toastCtrl: ToastController,
    public router: Router
  ) { this.loadEventsCategories(); }

  ngOnInit() {
  }

  loadEventsCategories(){
    this.events.geteventCategories()
    .then(data => {
		this.eventCategories = data[0];
    });
  }

  createEvent(){
    this.events.create_event(this.event).subscribe(async (resp) => {
      let toast = await this.toastCtrl.create({
        message: "Event has been successfully created",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.router.navigate(['/events',{eventzone:'manage'}]);
    }, async (err) => {
      let toast = await this.toastCtrl.create({
        message: "Failed to create event! Try Again later",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
