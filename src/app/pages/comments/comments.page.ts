import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @ViewChild('postPhoto') postPhoto;	
	postPhotoOptions: FormGroup;
	@ViewChild('comment_box') comment_box;
	public comments : any = [];
	public post_id : any;
	public post_comment : any = {
		handle:'',
		message:'',
		id:'',
		my_id:localStorage.getItem('user_id')
	};
	public title = "Comments";
	public publishPhotos : any = '';
	private imageURL = "https://followthebirds.com/content/uploads/";
	
	private stickers = [];
	private stickerHeight;
	private stickerEmoji : string = "emoji";
	private sticker_active = 'false';
	private showEmojiTab;
	private allSticker = [];
	private allEmoji = [];
  constructor(
    public user: UserService, 
    formBuilder: FormBuilder, 
    public modalCtrl: ModalController, 
    public loadingCtrl: LoadingController, 
    private camera: Camera, 
    public toastCtrl: ToastController, 
    public post: PostService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.comments = JSON.parse(this.activatedRoute.snapshot.paramMap.get('comments')) || [];
    this.post_comment.id = this.activatedRoute.snapshot.paramMap.get('post_id');
    this.post_comment.handle = this.activatedRoute.snapshot.paramMap.get('handle');
    if(this.post_comment.handle == 'comment'){
      this.title = "Replies";
    }
    this.user.getStickers({}).then(data => {		  
      let item = data[0];
      for (var key in item) {
        this.stickers[":STK-"+item[key].sticker_id+":"] = item[key].image;
      }	
    });
    this.postPhotoOptions = formBuilder.group({
      file: [],
      type: "photos",
      handle: "comment",
      multiple: true,
      user_id : localStorage.getItem('user_id')
    });
   }

  ngOnInit() {
    if(this.post_comment.handle == 'photo'){
      this.user.getPhoto(parseInt(localStorage.getItem('user_id')),{'photo_id':this.post_comment.id})
        .then(data => {
        this.comments = data['photo_comments'];
      });
    }
    
    this.user.getStickers({}).then(data => {		  
      this.allSticker = data[0];	
    });
    
    this.user.getEmojis({}).then(data => {		  
      this.allEmoji = data[0];	
    });
  }

  dismiss() {
    //this.viewCtrl.dismiss(this.comments.length);
  }

  takeCameraSnap(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit:true,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true,
      correctOrientation: true //Corrects Android orientation quirks
    };	
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
       this.postPhotoOptions.patchValue({ 'file': "data:image/jpeg;base64,"+imageData }); 
       this.postPhotoOptions.patchValue({ 'multiple': false });
       this.uploadPhoto(this.postPhotoOptions);
     }, (err) => {
      alert('Unable to take photo');
     });
    }
    
    getBackgroundStyle(url) {
      if(!url){
        return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
      } else {
        return 'url(' + this.imageURL+url + ')'
      }
    }
    
    removePhoto(){
      this.publishPhotos = '';
      this.post_comment['photo'] = '';
    }
    
    uploadFromGallery(){
      this.postPhoto.nativeElement.click();
    }
    
    showSticker(){
      this.sticker_active = 'true';  
      let timer = 100;
      var interval;
      clearInterval(interval);
      var smooth = 10;
      var unit = (smooth*100)/timer;
        var width = unit;
      interval = setInterval(() => {
            width = width + unit;
        if(width <= 250){
          this.stickerHeight = width;			
        } else {
          clearInterval(interval);
        }
        }, smooth);
    }
    
    hideSticker() {
      this.sticker_active = 'false';
      let timer = 100;
      var interval;
      clearInterval(interval);
      var smooth = 10;
      var unit = (smooth*100);
        var width = unit;
      interval = setInterval(() => {
            width = width - unit;
        if(width >= 0){
          this.stickerHeight = width;			
        } else {
          clearInterval(interval);
        }
        }, smooth);
    }
    
    showEmoji(action,event){
      this.showEmojiTab = action;
    }
  
    sendEmoji(emoji){
    this.post_comment.message = this.post_comment.message + emoji + ' ';
    }
    
    sendStickerMsg(sticker){
      this.stickerHeight = 0;
      this.post_comment.message = sticker;
      this.postComment();
    }
    
    processWebImage(event) {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.postPhotoOptions.patchValue({ 'file': imageData });
      this.postPhotoOptions.patchValue({ 'multiple': false });
      this.uploadPhoto(this.postPhotoOptions);	  
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    
    async uploadPhoto(params){
      let loading = await this.loadingCtrl.create({
        message: 'Uploading...'
      });
      loading.present();
      this.user.photoUploader(params).subscribe((resp) => {
        loading.dismiss();	
        this.publishPhotos = resp;
        this.post_comment['photo'] = resp;
      }, async (err) => {
        loading.dismiss();		
        let toast = await this.toastCtrl.create({
        message: "image uploading failed",
        duration: 3000,
        position: 'top'
        });
        toast.present();
      });
    }
    
    setReplyComment(comments,post_id){
     // const commentsReplyModal = this.modalCtrl.create('CommentsPage',{comments,'post_id':post_id,'handle':'comment'});
      //commentsReplyModal.present();
    }
    
    
  postComment(){
    this.post.postComment(this.post_comment).subscribe((resp) => {	
      this.comments.push(resp);
      this.post_comment.message = '';
      this.post_comment.photo = '';
      this.publishPhotos = '';
    }, (err) => {        
    });
  }

}
