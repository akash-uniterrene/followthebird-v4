import { Component, OnInit,ViewChild } from '@angular/core';
import { ActionSheetController,Platform,ToastController,LoadingController,ModalController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-whats-on-mind',
  templateUrl: './whats-on-mind.page.html',
  styleUrls: ['./whats-on-mind.page.scss'],
})
export class WhatsOnMindPage implements OnInit {
  @ViewChild('postPhoto') postPhoto;
  @ViewChild('postVideo') postVideo;
  @ViewChild('postAudio') postAudio;
  @ViewChild('postFile') postFile;
  public userName: string;
  public userPic: string;
  public loading;
  postPhotoOptions: FormGroup;
  postVideoOptions: FormGroup;
  postAudioOptions: FormGroup;
  postFileOptions: FormGroup;
  private publisherInfo : any = {
    handle: '',
    id: '',
    message: '',
    album: '',
    feeling_action:'',
    feeling_value: '',
    location : '',
    privacy: 'public',
    link: '',
    poll_options:'',
    product:'',
    video:'',
    audio:'',
    file:'',
    photos: [],
    my_id: localStorage.getItem('user_id')
  };
  params: Object;
  pushPage: any;
  public publishPhotos : any = [];
  public icon;
  public imageLists: any[] = [];
  private mediaPublisher : any ='';
  private imageURL = "https://followthebirds.com/content/uploads/";
  constructor(
    public user: UserService,
    formBuilder: FormBuilder,	
    public post: PostService,  
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform, 
    private camera: Camera,
    public imagePicker: ImagePicker,
    public modalCtrl: ModalController,
    private transfer: FileTransfer,
    private file: File,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.loading = this.loadingCtrl.create({
      message: 'Publishing Post...',
    });
  
    if(localStorage.getItem('user_id')){
      this.setUser();        
    }else{
      this.router.navigate(['/login']);
    }

    this.postPhotoOptions = formBuilder.group({
			file: [],
			type: "photos",
			handle: "publisher",
			multiple: true,
			user_id : localStorage.getItem('user_id')
	  });
	  
	  this.postVideoOptions = formBuilder.group({
			type: "video",
			handle: "publisher",
			multiple: true,
			user_id : localStorage.getItem('user_id')
	  });
	  
	  this.postAudioOptions = formBuilder.group({
			type: "audio",
			handle: "publisher",
			multiple: true,
			user_id : localStorage.getItem('user_id')
	  });
	  
	  this.postFileOptions = formBuilder.group({
			type: "file",
			handle: "publisher",
			multiple: true,
			user_id : localStorage.getItem('user_id')
	  });
		
	  /*if(this.activatedRoute.snapshot.paramMap.get('id') == localStorage.getItem('user_id')){
		  this.publisherInfo.handle = "me";
	  } else {
			this.publisherInfo.handle = this.activatedRoute.snapshot.paramMap.get('handle');
			this.publisherInfo.id = this.activatedRoute.snapshot.paramMap.get('id');
	  }
	  
	  if(this.activatedRoute.snapshot.paramMap.get('files') && this.activatedRoute.snapshot.paramMap.get('vault_type') == 'image'){
			let resp : any = this.activatedRoute.snapshot.paramMap.get('files');
			if(this.publishPhotos.length > 0){
				for (var key in resp) {
					this.publishPhotos.push(resp[key]);
				}
			} else {
				this.publishPhotos = resp;
			}
			this.publisherInfo.photos = JSON.stringify(this.activatedRoute.snapshot.paramMap.get('files'));
	  } if(this.activatedRoute.snapshot.paramMap.get('files') && this.activatedRoute.snapshot.paramMap.get('vault_type') == 'mp4'){
			var obj = {source: this.activatedRoute.snapshot.paramMap.get('files')[0]};
			var myJSON = JSON.stringify(obj);
			this.publisherInfo.video = myJSON;
			this.mediaPublisher = 'video';
	  } else if(this.activatedRoute.snapshot.paramMap.get('files') && this.activatedRoute.snapshot.paramMap.get('vault_type') == 'mp3'){
			var obj = {source: this.activatedRoute.snapshot.paramMap.get('files')[0]};
			var myJSON = JSON.stringify(obj);
			this.publisherInfo.audio = myJSON;  
			this.mediaPublisher = 'audio';
	  } else if(this.activatedRoute.snapshot.paramMap.get('files') && this.activatedRoute.snapshot.paramMap.get('vault_type') == 'files'){
			var obj = {source: this.activatedRoute.snapshot.paramMap.get('files')[0]};
			var myJSON = JSON.stringify(obj);
			this.publisherInfo.file = myJSON;
			this.mediaPublisher = 'file';    
	  }*/
  }
  fileTransfer: FileTransferObject = this.transfer.create();
  ngOnInit() {
  }

  closeModal(){
    //this.navCtrl.pop();
  }

  setUser(){    
    this.userName = (localStorage.getItem('user_firstname'))+' '+(localStorage.getItem('user_lastname')); 
		this.userPic = this.user.getProfilePic();
  }
  
  async getFeelings(){
	   /*let profileModal = await this.modalCtrl.create('FeelingActivityPage');
	   profileModal.onDidDismiss(data => {
			this.publisherInfo.feeling_action = data.feeling_action;
			this.publisherInfo.feeling_value = data.feeling_value;
			this.icon = data.icon;
	   });
	   profileModal.present();*/
  }
  
  publishPost(){	
    this.loading.present();
      //Attempt to login in through our User service
      this.post.publishPost(this.publisherInfo).subscribe(async (resp) => {
		this.loading.dismiss();
        let toast = await this.toastCtrl.create({
          message: "Status has been successfully posted.",
          duration: 3000,
          position: 'top',
        });
        toast.present();
        this.closeModal();
      }, async (err) => {
        this.loading.dismiss();
        let toast = await this.toastCtrl.create({
          message: "Unable to post. Retry",
          duration: 3000,
          position: 'top',
        });
        toast.present();
        this.closeModal();
      });
  }
  
  removePhoto(index){
    var index = this.publishPhotos.indexOf(index);
    if (index > -1) {
      this.publishPhotos.splice(index, 1);
    }
    this.publisherInfo.photos = JSON.stringify(this.publishPhotos);
  }

  async uploadPicture() {
	const actionSheet = await this.actionSheetCtrl.create({
		header: 'Upload Photos',
		buttons: [
		{
			icon: !this.platform.is('ios') ? 'ios-camera' : null,	
			text: 'Take a Picture',
			handler: () => {
			this.takeCameraSnap(1)
			}
		},{
			icon: !this.platform.is('ios') ? 'ios-images' : null,		
			text: 'Upload from gallery',
			handler: () => {
				this.loadMultipleImageFromGallery();
				//this.takeCameraSnap(0)
			}
		},{
			icon: !this.platform.is('ios') ? 'ios-folder' : null,		
			text: 'Upload from vault',
			handler: () => {
			this.uploadFromVault('image');
			}
		},{
			icon: !this.platform.is('ios') ? 'close' : null,
			text: 'Cancel',
			role: 'cancel',
			handler: () => {
			}
		}
		]
	});
	actionSheet.present();
  }
  
  
  async uploadAudio() {
	const actionSheet = await this.actionSheetCtrl.create({
	  header: 'Upload Music ',
	  buttons: [
		{
		  icon: !this.platform.is('ios') ? 'ios-volume-up' : null,		
		  text: 'Upload Audio',
		  handler: () => {
			this.uploadFromGallery('audio');
		  }
		},{
		  icon: !this.platform.is('ios') ? 'ios-folder' : null,		
		  text: 'Upload from vault',
		  handler: () => {
			this.uploadFromVault('mp3');
		  }
		},{
		  icon: !this.platform.is('ios') ? 'close' : null,
		  text: 'Cancel',
		  role: 'cancel',
		  handler: () => {
		  }
		}
	  ]
	});
	actionSheet.present();
  }
  
  async uploadVideo() {
	const actionSheet = await this.actionSheetCtrl.create({
	  buttons: [
		{
		  icon: !this.platform.is('ios') ? 'ios-videocam' : null,		
		  text: 'Upload videos',
		  handler: () => {
			this.uploadFromGallery('video');
		  }
		},{
		  icon: !this.platform.is('ios') ? 'ios-folder' : null,		
		  text: 'Upload from vault',
		  handler: () => {
			this.uploadFromVault('mp4');
		  }
		},{
		  icon: !this.platform.is('ios') ? 'close' : null,
		  text: 'Cancel',
		  role: 'cancel',
		  handler: () => {
		  }
		}
	  ]
	});
	actionSheet.present();
  }
  
  uploadFromVault(filter){
    this.router.navigate(['/vaults',{'filter':filter,handle:this.publisherInfo.handle,handle_id:this.publisherInfo.id}]);
  }

  async uploadFile() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
      {
        icon: !this.platform.is('ios') ? 'ios-attach' : null,		
        text: 'Upload Attachment',
        handler: () => {
        this.uploadFromGallery('file');
        }
      },{
        icon: !this.platform.is('ios') ? 'ios-folder' : null,		
        text: 'Upload from vault',
        handler: () => {
        this.uploadFromVault('files');
        }
      },{
        icon: !this.platform.is('ios') ? 'close' : null,
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      }
      ]
    });
	  actionSheet.present();
  }
  
	public loadMultipleImageFromGallery() {  
    let options: ImagePickerOptions = {  
			quality: 100,  
			width: 600,  
			height: 600,  
			outputType: 1, 
			maximumImagesCount: 15,
		}; 
		this.imagePicker.getPictures(options).then((results) => {  
			for (let index = 0; index < results.length; index++) {  
				this.imageLists.push('data:image/jpeg;base64,' + results[index]);  
			}  
			console.log("Image Lists", this.imageLists);  
			this.postPhotoOptions.patchValue({ 'file': this.imageLists }); 
		    this.postPhotoOptions.patchValue({ 'multiple': true });
		    this.uploadMultiPhoto(this.postPhotoOptions);
		}, (error) => {  
			// Handle error   
			console.log("Error ", error);  
		});  
	}
    
	
	takeCameraSnap(sourceType:number){

		const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE,
		  allowEdit:true,
		  sourceType:sourceType,
		  saveToPhotoAlbum: true,
		  correctOrientation: true
		}

		this.camera.getPicture(options).then((imageData) => {
		  // imageData is either a base64 encoded string or a file URI
		  console.log(imageData);
		   this.postPhotoOptions.patchValue({ 'file': "data:image/jpeg;base64,"+imageData }); 
		   this.postPhotoOptions.patchValue({ 'multiple': false });
		   this.uploadSinglePhoto(this.postPhotoOptions);
		 }, async (err) => {
			let toast = await this.toastCtrl.create({
				message: "image capturing failed",
				duration: 3000,
				position: 'top'
			});
			toast.present();
		 });
	}
	
	uploadFromGallery(type){			
		if(type == 'video') {
			this.postVideo.nativeElement.click();
		}else if(type == 'audio') {
			this.postAudio.nativeElement.click();
		}else{
			this.postFile.nativeElement.click();
		}
	}

	processWebVideo(event) {
		this.postVideoOptions.patchValue({ 'multiple': false });
		this.uploadMedia(event.target.files[0],'video');
	}
	
	processWebAudio(event) {
		this.postAudioOptions.patchValue({ 'multiple': false });
		this.uploadMedia(event.target.files[0],'audio');
	}
	
	processWebFile(event) {
		this.postFileOptions.patchValue({ 'multiple': false });
		this.uploadMedia(event.target.files[0],'file');
	}
	
	async uploadMultiPhoto(params){
		let loading = await this.loadingCtrl.create({
			message: 'Uploading...'
		});
		loading.present();
		 this.user.nativePhotoUploader(params).subscribe((resp) => {
			loading.dismiss();	
			this.imageLists = [];
			console.log(resp);
			if(this.publishPhotos.length > 0){
				for (var key in resp) {
				  this.publishPhotos.push(resp[key]);
				}
			} else {
				this.publishPhotos = resp;
			}
			//this.publishPhotos.push(resp);
			this.publisherInfo.photos = JSON.stringify(this.publishPhotos);
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
	
	async uploadSinglePhoto(params){
		let loading = await this.loadingCtrl.create({
			message: 'Uploading...'
		});
		loading.present();
		 this.user.photoUploader(params).subscribe((resp) => {
			loading.dismiss();	
			this.publishPhotos.push(resp);
			this.publisherInfo.photos = JSON.stringify(this.publishPhotos);
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
	
	async uploadMedia(file,type){
		let loading = await this.loadingCtrl.create({
			message: 'Uploading...'
		});
		let mediaOptions;
		if(type == 'video'){
			this.mediaPublisher = 'video';
			mediaOptions = this.postVideoOptions.value;
		} else if(type == 'audio'){
			this.mediaPublisher = 'audio';
			mediaOptions = this.postAudioOptions.value;
		}else {
			this.mediaPublisher = 'file';
			mediaOptions = this.postFileOptions.value;
		}		
		loading.present();
		 this.user.fileUploader(file,mediaOptions).subscribe((resp) => {
			loading.dismiss();	
			var obj = {source: resp};
			var myJSON = JSON.stringify(obj);
			if(type == 'video'){
				this.publisherInfo.video = myJSON;
			} else if(type == 'audio'){
				this.publisherInfo.audio = myJSON;
			} else {
				this.publisherInfo.file = myJSON;
			}		
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
	
	getBackgroundStyle(url) {
		if(!url){
			return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
		} else {
			return 'url(' + this.imageURL+url + ')'
		}
	}

}
