import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, MenuController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
	account: { user_name: string, user_password: string } = {
		user_name: '',
		user_password: ''
	};
	private imageURL = "https://followthebirds.com/content/uploads/";
	loggedinUser : any = [];
	respUser : any = [];
	// Our translated text strings
	private loginErrorString: string;
    constructor(
		public navCtrl: NavController,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public menu: MenuController,
		public platform: Platform,
	) {
	  
    }

	ngOnInit() {
	 
	}
	
	doLogin() {
		console.log(this.account);
	}
	

}
