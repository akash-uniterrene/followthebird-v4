import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController,NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {
  private imageURL = "https://followthebirds.com/content/uploads/";
  private profile : any = [];
  constructor(
    public navCtrl: NavController,  
    public alertCtrl : AlertController,
    public user: UserService,
    public loadingCtrl : LoadingController,
    public router: Router
  ) { 
    for (var i = 0; i < localStorage.length; i++){
      this.profile[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
    }
  }

  ngOnInit() {
    this.user.updateProfile(parseInt(localStorage.getItem('user_id'))).subscribe(data => {
      if(data){
        this.profile = data;
      } else {
      
      }     
    });
  }
  

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 1000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    localStorage.clear();
    this.router.navigate(['/']);
		
  }

  openTerm(){
      this.router.navigate(['/terms']);
    }
    
    viewProfile(){
      this.router.navigate(['/profile', {user_name: this.profile.user_name,user_id:this.profile.user_id}]);
    }
    
    listFriends(){
      this.router.navigate(['/friends', {'user_id':this.profile.user_id}]);
    }
    
    listGroups(){
      this.router.navigate(['/groups', {'user_id':this.profile.user_id}]);
    }
    
    listEvents(){
      this.router.navigate(['/events', {'user_id':this.profile.user_id}]);
    }
    
    listPages(){
      this.router.navigate(['/pages', {'user_id':this.profile.user_id}]);
    }
    
    accoutSettings(){
      this.router.navigate(['/account-settings']);
    }
    
    privacySettings(){
      this.router.navigate(['/privacy-settings']);
    }
    
    securitySettings(){
      this.router.navigate(['/security-settings']);
    }
    
    blockSettings(){
      this.router.navigate(['/block-settings']);
    }
    
    goVaults(){
      this.router.navigate(['/vaults']);
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
