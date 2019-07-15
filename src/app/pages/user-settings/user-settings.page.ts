import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {
  private imageURL = "https://followthebirds.com/content/uploads/";
  private profile : any = [];
  constructor(
	public alertCtrl : AlertController,
	public loadingCtrl : LoadingController,
	public router: Router
  ) { 
	for (var i = 0; i < localStorage.length; i++){
		this.profile[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
		// do something with localStorage.getItem(localStorage.key(i));
	}
  }

  ngOnInit() {
  }
  
  listFriends(){
	  
  }
  
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 2000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
	
	localStorage.clear();
	this.router.navigate(['/']);
	const { role, data } = await loading.onDidDismiss();
	console.log('Loading dismissed!');
		
  }
  
  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout?',
      message: 'Are you sure want to logout? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
           this.presentLoading();
          }
        }
      ]
    });

    await alert.present();
  }

}
