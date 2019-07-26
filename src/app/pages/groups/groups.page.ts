import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { GroupsService } from '../../service/groups.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  groupzone: string = "discover";
	public groupLists : any = [];
	private imageURL = "https://followthebirds.com/content/uploads/";
  constructor(public user: UserService, public groups: GroupsService,public router: Router) { 
    this.groupzone = /*navParams.get('groupzone') ||*/ 'discover';
  }

  ngOnInit() {
    this.loadGroup('suggested');
    this.loadGroup('joined');
    this.loadGroup('manage');
  }

  loadGroup(type){
    this.groups.getgroups({type: type,id:parseInt(localStorage.getItem('user_id'))})
    .then(data => {
		this.groupLists[type] = data[0];
    });
  }
  
  viewGroup(group){
    this.router.navigate(['/group-profile',{groupProfile:group}]);
  }
  
  createGroup(){
    this.router.navigate(['/group-create']);
  }
  
  leaveGroupAction(event,type,group_id){
    event.target.parentNode.parentNode.parentNode.remove()
    this.connectAction(type,group_id)
  }

  joinGroupAction(event,type,group_id){
    event.target.parentNode.parentNode.parentNode.remove()
    this.connectAction(type,group_id)
  }

  connectAction(type,group_id){
		let params :any = {
			'do': type,
			'id': group_id,
			'my_id' : localStorage.getItem('user_id')
		};
		this.user.connection(params).subscribe((resp) => {						
			
		}, (err) => {
		
		});
  }
  
}
