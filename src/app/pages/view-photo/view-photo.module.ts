import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ViewPhotoPage } from './view-photo.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPhotoPage
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
  ],
  declarations: [ViewPhotoPage]
})
export class ViewPhotoPageModule {}
