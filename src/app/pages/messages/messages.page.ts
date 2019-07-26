import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../../service/user.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  public user_live_messages_counter = '';
  public onlineUsers = [];
  public offlineUsers = [];
  messagezone: string = "messages";
  public messages : any = [];
  public groups : any = [];
  public imageURL = "https://followthebirds.com/content/uploads/";
  public bulkMessage;
  public chatPhotos : any = [];
  public pageCount = 2;
  public stickers = [];
  public chatInfo : any = {
    conversation_id:'',
    photo:'',
    message: '',
    user_id:localStorage.getItem('user_id'),
  };
  constructor(
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public router: Router,
    public user: UserService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.user.getStickers({}).then(data => {		  
      let item = data[0];
      for (var key in item) {
        this.stickers[":STK-"+item[key].sticker_id+":"] = item[key].image;
      }	
    });
      
    this.getOnlineUsers();
    this.getOfflineUsers();
    this.getProfileData(localStorage.getItem('user_id'));
    this.bulkMessage = this.activatedRoute.snapshot.paramMap.get('bulkMessage') || 'false';
    this.chatPhotos = this.activatedRoute.snapshot.paramMap.get('files');
  }

  ngOnInit() {
    this.user.resetAlert({my_id:localStorage.getItem('user_id'),type:'messages'}).subscribe((resp) => {
      localStorage.setItem('user_live_messages_counter','0')
    }, (err) => {
      
    });	    
    this.user.getConversations({user_id:localStorage.getItem('user_id')}).then(data => {
      let item = data[0];
      for (var key in item) {
        if(item[key].multiple_recipients){
          this.groups.push(item[key]);
        } else {
          this.messages.push(item[key]);
        }		 
      }		
    });
  }

  getProfileData(id){
    this.user.updateProfile(id).subscribe((resp) => {	
      this.user_live_messages_counter = resp['user_live_messages_counter'];
      if(this.user_live_messages_counter == '0'){
        this.user_live_messages_counter = '';
      }
    }, (err) => {
      
    });	
  }
    
  getOnlineUsers(){
    this.user.getOnlineUsers({user_id: parseInt(localStorage.getItem('user_id'))})
    .then(data => {
      this.onlineUsers = data[0];
    }); 
  }
    
  getOfflineUsers(){
    this.user.getOfflineUsers({user_id: parseInt(localStorage.getItem('user_id'))})
    .then(data => {
      this.offlineUsers = data[0];
    }); 
  }
    
  viewMessage(conversation){
    this.router.navigate(['/view-message',{conversation: JSON.stringify(conversation)}]);
  }
    
  viewMessageGroup(conversation,group){
    this.router.navigate(['/view-message',{conversation: JSON.stringify(conversation),group:group}]);
  }
      
  createConversation(){
    this.router.navigate(['/message-create']);
  }
    
  isToday(data){
    var date = data.split(' ');
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    
    var pDate = date[0].split('-');
    if(pDate[0] != yyyy ){
      return false;
    }else{
      if(pDate[1] != mm){
        return false;
        
      }else{
        if(pDate[2] != dd){
          return false;
        }else{
          return true;
        }
      }
    }
    
  }
    
  sentBulkMessage(event,message){		
    let item = this.chatPhotos;	
    for(var key in item){
      this.chatInfo.conversation_id = message.conversation_id;
      this.chatInfo.photo = JSON.stringify(item[key]);
      this.user.postMessage(this.chatInfo).subscribe((resp) => {	
        event.target.innerText = "SENT";
        event.target.offsetParent.disabled = true;
      }, (err) => {
        
      });
    }
  } 
    
  doInfinite(infiniteScroll) {
    setTimeout(() => {
    this.user.getConversations({user_id:localStorage.getItem('user_id'),'page': this.pageCount})
    .then(data => {			
      if(data[0].length > 0) {
        let item = data[0];
        for (var key in item) {
          if(item[key].multiple_recipients){
            this.groups.push(item[key]);
          } else {
            this.messages.push(item[key]);
          }
        }
      }
    });
    this.pageCount = this.pageCount + 1;
      infiniteScroll.complete();
    }, 500);
  }
     
  messageAction(profile){
    let recipient = {
      name:profile.user_firstname+' '+profile.user_lastname,
      picture:profile.user_picture,
      id:profile.user_id
    };
    this.router.navigate(['/view-message',{conversation: JSON.stringify(recipient)}]);
  }
    
  async deleteConversationAction(conversation){
    const confirm = await this.alertCtrl.create({
      header: 'Delete conversation?',
      message: 'Once you delete you can not undo this step.',
      buttons: [
      {
        text: 'Cancel',
        handler: () => {
        
        }
      }
      ,{
        text: 'Delete',
        handler: () => {
        this.deleteConversation(conversation);
        }
      }
      ]
    });
    confirm.present(); 
  }
    
  deleteConversation(conversation){
    let items :any = {
      user_id:localStorage.getItem('user_id'),
      conversation_id:conversation.conversation_id,
      last_message_id:localStorage.getItem('last_message_id')
    }
    this.user.deleteConversation(items).subscribe(async (resp) => {	
      let toast = await this.toastCtrl.create({
        message: "Conversation has been deleted",
        duration: 3000,
        position: 'top',
      });
      toast.present();	
      this.router.navigate(['/messages']);	
    }, async (err) => {
      let toast = await this.toastCtrl.create({
        message: "Failed to deleted conversation",
        duration: 3000,
        position: 'top',
      });
      toast.present();	
    });
  }

}
