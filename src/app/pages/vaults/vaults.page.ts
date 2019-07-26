import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VaultCreatePage } from '../vault-create/vault-create.page';
@Component({
  selector: 'app-vaults',
  templateUrl: './vaults.page.html',
  styleUrls: ['./vaults.page.scss'],
})
export class VaultsPage implements OnInit {
  public vaults = [];
  public filter = 'all';
  private handle = '';
  private handle_id = '';
  constructor(public user: UserService,public router: Router,public modalCtrl: ModalController) { }

  ngOnInit() {
    this.user.getVaultStorage({my_id:localStorage.getItem('user_id'),filter:this.filter})
		.then(data => {
			let item = data[0];
			for (var key in item) {
			  this.vaults.push(item[key]);
			}
	  });
  }

  async createVault(){
    const modal = await this.modalCtrl.create({
      component: VaultCreatePage
    });
    return await modal.present();
  }
    
  viewVault(vault){
    this.router.navigate(['/view-vault', {vault:vault,handle:this.handle,handle_id:this.handle_id}]);
  }

}
