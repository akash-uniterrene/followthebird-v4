import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {
  settingszone: string = "email";
  
  emailForm : any = {
	  'user_email':localStorage.getItem('user_email'), 
	  'user_id':localStorage.getItem('user_id'), 
  }
  
  settings : any = {
    'user_id':localStorage.getItem('user_id'),  
    'current':'',
    'new':'',
    'confirm':'',
  }
  constructor(
    public user: UserService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async saveEmail(){
    let loading = await this.loadingCtrl.create({
        message: 'Updating Email...'
    });
    loading.present();
    this.user.saveEmailAddress(this.emailForm).subscribe(async (resp) => {
      loading.dismiss();	
      let toast = await this.toastCtrl.create({
        message: "Email has been saved!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      for (var key in this.emailForm) {
        localStorage.setItem(key,this.emailForm[key])
      }
    }, async (err) => {
      loading.dismiss();		
      let toast = await this.toastCtrl.create({
      message: "Failed to save email",
      duration: 3000,
      position: 'top'
      });
      toast.present();
    });
    }
    
    async savePassword(){
    let loading = await this.loadingCtrl.create({
        message: 'Updating Email...'
    });
    loading.present();
    this.user.savePassword(this.settings).subscribe(async (resp) => {
      loading.dismiss();	
      let toast = await this.toastCtrl.create({
        message: "Password has been saved!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      /* for (var key in this.emailForm) {
        localStorage.setItem(key,this.emailForm[key])
      } */
    }, async (err) => {
      loading.dismiss();		
        let toast = await this.toastCtrl.create({
        message: "Failed to save password",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    }

}
