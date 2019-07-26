import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController} from '@ionic/angular';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.page.html',
  styleUrls: ['./privacy-settings.page.scss'],
})
export class PrivacySettingsPage implements OnInit {

  private privacySettings = {
    user_id:'',  
    user_privacy_basic:'',
    user_privacy_birthdate:'',
    user_chat_enabled:'',
    user_privacy_education:'',
    user_privacy_events:'',
    user_privacy_friends:'',
    user_privacy_groups:'',
    user_privacy_location:'',
    user_privacy_other:'',
    user_privacy_pages:'',
    user_privacy_photos:'',
    user_privacy_relationship:'',
    user_privacy_wall:'',
    user_privacy_work:''
  }
  constructor(public user: UserService,private loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    for (var key in this.privacySettings) {
      this.privacySettings[key] = localStorage.getItem(key);
    }
   }
  ngOnInit() {
  }
  async saveChanges(){
    let loading = await this.loadingCtrl.create({
      message: 'Updating Records...'
    });
    loading.present();
    this.user.saveUserRecord(this.privacySettings).subscribe(async (resp) => {
      loading.dismiss();	
      let toast = await this.toastCtrl.create({
        message: "Records has been saved!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      for (var key in this.privacySettings) {
        localStorage.setItem(key,this.privacySettings[key])
      }
    }, async (err) => {
      loading.dismiss();		
      let toast = await this.toastCtrl.create({
        message: "Failed to save records",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
