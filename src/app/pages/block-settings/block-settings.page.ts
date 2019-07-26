import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AlertController, ToastController} from '@ionic/angular';
@Component({
  selector: 'app-block-settings',
  templateUrl: './block-settings.page.html',
  styleUrls: ['./block-settings.page.scss'],
})
export class BlockSettingsPage implements OnInit {
  private users : any = [];
  private imageURL = "https://followthebirds.com/content/uploads/";
  constructor(public user: UserService,private alertCtrl: AlertController,public toastCtrl: ToastController) { }

  ngOnInit() {
    this.user.getBlocked({'my_id':localStorage.getItem('user_id')})
    .then(data => {
      let item = data[0];
      for (var key in item) {
        this.users.push(item[key]);
      }
    });
  }

  async unblockAction(event,member){
    const confirm = await this.alertCtrl.create({
			header: 'Unblock '+member.user_firstname+' '+member.user_lastname+'?',
			message: 'If you unblock, '+member.user_firstname+' may be able to see your timeline and connect to you.',
			buttons: [
			{
				text: 'Cancel',
				handler: () => {
				
				}
			}
			,{
				text: 'Delete',
				handler: () => {
          event.target.parentNode.parentNode.parentNode.remove();
          this.connectAction('unblock',member.user_id);
				}
			}
			]
		});
		confirm.present();  
  }

  connectAction(type,id,uid?: any){
    let params :any = {
      'do': type,
      'id': id,
      'uid': uid,
      'my_id' : localStorage.getItem('user_id')
    };
    this.user.connection(params).subscribe((resp) => {						
      
    }, (err) => {
    
    });
  }

}
