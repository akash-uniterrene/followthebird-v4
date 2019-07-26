import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GroupsService } from '../../service/groups.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.page.html',
  styleUrls: ['./group-create.page.scss'],
})
export class GroupCreatePage implements OnInit {
  private group : any = {
	  group_title:'',
	  group_username:'',
	  group_privacy:'',
	  group_description:'',
	  my_id:localStorage.getItem('user_id'),
  };
  constructor(public toastCtrl: ToastController, public groups: GroupsService,public router: Router) { }

  ngOnInit() {
  }

  createGroup(){
    this.groups.create_group(this.group).subscribe(async (resp) => {
      let toast = await this.toastCtrl.create({
        message: "Group has been successfully created",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.router.navigate(['/groups',{groupzone:'manage'}]);
    }, async (err) => {
      let toast = await this.toastCtrl.create({
        message: "Failed to create Group! Try Again later",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
