import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { VaultCreatePage } from '../vault-create/vault-create.page';
import { IonicModule } from '@ionic/angular';

import { VaultsPage } from './vaults.page';

const routes: Routes = [
  {
    path: '',
    component: VaultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    VaultCreatePage
  ],
  declarations: [VaultsPage,VaultCreatePage]
})
export class VaultsPageModule {}
