import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { SettingsService } from '../../service/settings.service';
import { NavController, ActionSheetController,  Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
	account: { user_name: string, user_password: string } = {
		user_name: 'akash',
		user_password: '12345678'
	};
  constructor(
	public storage: StorageService,
	public settings: SettingsService,
	public router: Router,
	public NavCtrl: NavController
  ) {
	 if(localStorage.getItem('user_firstname')){
	   this.NavCtrl.navigateRoot("tabs");
	 }
   }
   
   ngOnInit() {
    this.createDirectory();
   }
   
    async doLogin() {
       this.settings.login(this.account).subscribe((resp) => {	
			this.storage.setUser(resp);			
			this.router.navigate(['/tabs']);     
	   }, (err) => {
	   });
    }

  
  
  signup() {
	this.router.navigate(['/signup']);
  }

  forgetPasswordpage(){
	this.router.navigate(['/signup']);
  }
  
  createDirectory(){
	this.storage.createFolder();
  }
	
  download(url,folder) {
	this.storage.imageDownload(url,folder);
  }

}
