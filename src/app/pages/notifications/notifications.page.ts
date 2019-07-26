import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Badge } from '@ionic-native/badge/ngx';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public notifications : any = [];
  private imageURL = "https://followthebirds.com/content/uploads/";
  private pageCount = 1;
  constructor(
    public navCtrl: NavController, 
		public user: UserService,
		public toastCtrl: ToastController,
		public platform: Platform, 
		public menu: MenuController,
    public badge: Badge,
    public router: Router,
		public actionSheetCtrl: ActionSheetController,
		public loadingCtrl: LoadingController
  ) { 
    this.user.resetAlert({my_id:localStorage.getItem('user_id'),type:'notifications'}).subscribe((resp) => {
			this.badge.clear();
			localStorage.setItem('user_live_notifications_counter','0');
		}, (err) => {
			
		}); 
  }

  ngOnInit() {
    this.user.getNotifications().then(data => {
      let item = data[0];
      for (var key in item) {
        this.notifications.push(item[key]);
      }		
    });
  }

  doRefresh(refresher) {
   this.ngOnInit();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  viewProfile(user_name,user_id) {
    this.router.navigate(['/profile',{user_name: user_name,user_id:user_id}]);
  }

  isToday(data){
    var date = data.split(' ');
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    
    var pDate = date[0].split('-');
    if(pDate[0] != yyyy ){
      return false;
    }else{
      if(pDate[1] != mm){
        return false;
      }else{
        if(pDate[2] != dd){
          return false;
        }else{
          return true;
        }
      }
    }
    
   }

   doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.user.getNotifications({'page': this.pageCount}).then(data => {
      let item = data[0];
      for (var key in item) {
        this.notifications.push(item[key]);
      }		
    });	
      this.pageCount = this.pageCount + 1;
      infiniteScroll.complete();
    }, 500);
  }
}
