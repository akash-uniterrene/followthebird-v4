import { Component, OnInit } from '@angular/core';
import { ModalController,ToastController } from '@ionic/angular';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vault-create',
  templateUrl: './vault-create.page.html',
  styleUrls: ['./vault-create.page.scss'],
})
export class VaultCreatePage implements OnInit {
  public createVault = {
	  title:'',
	  vaultname:'',
	  file_type:'',
	  my_id: localStorage.getItem('user_id')
  }
  constructor(public modalCtrl: ModalController,public toastCtrl: ToastController,public user: UserService,public router: Router) { }

  ngOnInit() {
  }

  checkValid(){
	  if(this.createVault.title != '' && this.createVault.vaultname != '' && this.createVault.file_type != ''){
		  return true;	  
	  } else {
		  return false;
	  }
  }

  createNewVault(){  
    this.user.createNewVault(this.createVault).subscribe(async (resp) => {
      let toast = await this.toastCtrl.create({
        message: "Vault has been created successfully",
        duration: 3000,
        position: 'top',
      });
      toast.present();
      this.router.navigate(['/vaults']);
      }, async (err) => {
        let toast = await this.toastCtrl.create({
          message: "Unable to create. Retry",
          duration: 3000,
          position: 'top',
        });
        toast.present();
      });
    }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
