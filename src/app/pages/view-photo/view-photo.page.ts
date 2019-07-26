import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NavController, Platform, ActionSheetController, ToastController, ModalController, AlertController } from '@ionic/angular';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
import { StorageService } from '../../service/storage.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CommentsPage } from '../comments/comments.page';
@Component({
  selector: 'app-view-photo',
  templateUrl: './view-photo.page.html',
  styleUrls: ['./view-photo.page.scss'],
})
export class ViewPhotoPage implements OnInit {
  public photo : any = [];
  public screenBlur = 1;
  private imageURL = "https://followthebirds.com/content/uploads/";
  constructor(
    public navCtrl: NavController, 
    public user: UserService,
    public post: PostService,  
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private transfer: FileTransfer,
    private file: File, 
    public storage: StorageService,
    private socialSharing: SocialSharing,
    public modalCtrl: ModalController,
    private platform: Platform,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.photo =  JSON.parse(this.activatedRoute.snapshot.paramMap.get('photo')) || [];
  }
    fileTransfer: FileTransferObject = this.transfer.create();
    ngOnInit() {
      this.user.getPhoto(parseInt(localStorage.getItem('user_id')),{'photo_id':this.photo.photo_id,'get_gallery':true})
      .then(data => {
      this.photo = data;
    });
  }

  getNextPhoto(nextData){	 
    this.screenBlur = 0.5;
    this.user.getPhoto(parseInt(localStorage.getItem('user_id')),{'photo_id':nextData.photo_id,'get_gallery':true})
      .then(data => {
      this.photo = data;
      this.screenBlur = 1;
    });  
    }
    
    getPrevPhoto(prevData){
     this.screenBlur = 0.5;
     this.user.getPhoto(parseInt(localStorage.getItem('user_id')),{'photo_id':prevData.photo_id,'get_gallery':true})
      .then(data => {
      this.photo = data;
      this.screenBlur = 1;
    }); 
    }
    
    async viewComments(){
      if(this.photo.is_single){
        const commentsModal = await this.modalCtrl.create({
          component: CommentsPage,
          componentProps: {
            comments:this.photo.post.post_comments,
            post_id:this.photo.post_id,
            handle:'post'
          }
        });
        commentsModal.present();
      } else {
        let comments = '';
        const commentsModal = await this.modalCtrl.create({
          component: CommentsPage,
          componentProps: {
            comments:comments,
            post_id:this.photo.post_id,
            handle:'photo'
          }
        });
        commentsModal.present();
      }
    }
    
    getBackgroundStyle(url) {
      if(!url){
        return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
      } else {
        return 'url(' + this.imageURL+url + ')'
      }
    }
    
    openSearch(){
      this.router.navigate(['/SearchPage']);
    }
    
    goBack(){
     this.navCtrl.pop(); 
    }
    
    async photoActivity(photo){	
      let  buttons : any = [
        {
          icon: !this.platform.is('ios') ? 'ios-download' : null,	
          text: 'Save to phone',
          handler: () => {
          this.download(photo.source,"ShareImage");
          }
        },{
          icon: !this.platform.is('ios') ? 'share-alt' : null,		
          text: 'Share External',
          handler: () => {
          this.shareImg(photo.source,"ShareImage");  
          }
        }
      ];
      if(localStorage.getItem('user_id') == photo.post.author_id){		
        let deleteBtn : any = {
          icon: !this.platform.is('ios') ? 'ios-trash' : null,		
          text: 'Delete Photo',
          handler: () => {
          this.deletePhotoAction(photo.photo_id)
          }
        };		
        buttons.push(deleteBtn);
      } else {
        let report : any = {
          icon: !this.platform.is('ios') ? 'ios-alert' : null,		
          text: 'Report Photo',
          handler: () => {
          this.reportAction("post",photo.post.post_id)
        }
      };		
      buttons.push(report);
    }
    
    const actionSheet = await this.actionSheetCtrl.create({
      buttons
    });
    
    actionSheet.present();
    }
    
    async sharePostCtrl(post_id): Promise<void>
    {
      let prompt = await this.alertCtrl.create({
      header: 'Share this post',	
      inputs : [
      {
        type:'radio',
        label:'Share post now ',
        value:post_id
      },
      {
        type:'radio',
        label:'Write Post',
        value:post_id
      }],
      buttons : [
      {
        text: "Cancel",
        handler: data => {
        }
      },
      {
        text: "Share",
        handler: data => {
          this.sharePost('share',post_id);
        }
      }]});
      prompt.present();
    }
    
    sharePost(type,id){
      this.post.sharePost({'do':type,id:id,my_id:localStorage.getItem('user_id')}).subscribe(async (resp) => {
        let toast = await this.toastCtrl.create({
          message: "Post has been shared successfully",
          duration: 3000,
          position: 'top'
        });
        toast.present();	
      }, async (err) => {
        let toast = await this.toastCtrl.create({
          message: "Unable to post. Retry",
          duration: 3000,
          position: 'top'
        });
        toast.present();
        });
    }
    
    //Save Image Function
    async download(url,folder) {
      /*if(this.storage.imageDownload(url,folder)){
        let toast = await this.toastCtrl.create({
          message: "Image has been saved!",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      } else {
        let toast = await this.toastCtrl.create({
          message: "Image has been saved!",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }*/
    }
    
    async deletePhotoAction(photo_id){
      const confirm = await this.alertCtrl.create({
        header: 'Delete Photo',
        message: 'Are you sure want to delete this photo?',
        buttons: [
        {
          text: 'Cancel',
          handler: () => {
          
          }
        },
        {
          text: 'Delete',
          handler: () => {
          this.reactAction('delete_photo',photo_id)				
          }
        }
        ]
      });
      confirm.present();
    }
    
    reactAction(type,post_id){
      let params :any = {
        'do': type,
        'id': post_id,
        'my_id' : localStorage.getItem('user_id')
      };
      this.post.reaction(params).subscribe(async (resp) => {	
        let toast = await this.toastCtrl.create({
          message: "Image has been deleted",
          duration: 3000,
          position: 'top'
        });					
        toast.present();
        this.getNextPhoto(this.photo.next);
      }, async (err) => {
        let toast = await this.toastCtrl.create({
          message: "sorry! image is unable to delete.",
          duration: 3000,
          position: 'top'
        });	
        toast.present();
      });
    }
   
     reportAction(handle,id){
    let params :any = {
      'handle': handle,
      'id': id,
      'my_id' : localStorage.getItem('user_id')
    };
    this.user.report(params).subscribe(async (resp) => {
      let toast = await this.toastCtrl.create({
        message: "Report has been submitted successfully",
        duration: 3000,
        position: 'top'
      });							
      toast.present();
    }, async (err) => {
      let toast = await this.toastCtrl.create({
        message: "Failed to Submit Report. Please Try Again",
        duration: 3000,
        position: 'top'
      });		
      toast.present();
    });
    }
    
    shareImg(url,folder) {
      var arr = url.split("/");
      var imageName = arr[arr.length - 1];	
      const absurl = this.imageURL+url;
      this.fileTransfer.download(absurl, this.file.externalRootDirectory + 'FollowTheBirds/'+folder+'/'+imageName).then((entry) => {
        return new Promise(resolve => {
          console.log('success ' + resolve);
          this.socialSharing.share("","Subject", this.file.externalRootDirectory + 'FollowTheBirds/'+folder+ "/" + imageName, '')
            .then((entries) => {
              console.log('success ' + JSON.stringify(entries));
          }).catch((error) => {
              alert('error ' + JSON.stringify(error));
          });
        });  
      }, (error) => {
          return false;
      });
    }

}
