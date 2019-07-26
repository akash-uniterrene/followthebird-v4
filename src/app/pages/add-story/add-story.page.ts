import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, LoadingController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.page.html',
  styleUrls: ['./add-story.page.scss'],
})
export class AddStoryPage implements OnInit {
  @ViewChild('postPhoto') postPhoto;
  postPhotoOptions: FormGroup;  
  public publishStory : any = {
	do: 'publish',
	message: '',
	photos: {},
    user_id : localStorage.getItem('user_id')	
  }
  public publishPhotos : any = [];
  private imageURL = "https://followthebirds.com/content/uploads/";
  constructor(
    public toastCtrl: ToastController,
    formBuilder: FormBuilder,	
    private camera: Camera,
    public loadingCtrl: LoadingController,
		private platform: Platform,
		private post: PostService,
		public user: UserService,
    public router: Router,
    public navCtrl: NavController
  ) { 
    this.postPhotoOptions = formBuilder.group({
			file: [],
			type: "photos",
			handle: "publisher-mini",
			multiple: true,
			user_id : localStorage.getItem('user_id')
		});
  }

  ngOnInit() {
  }

  takeCameraSnap(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit:true,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }
  
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
       this.postPhotoOptions.patchValue({ 'file': "data:image/jpeg;base64,"+imageData }); 
       this.postPhotoOptions.patchValue({ 'multiple': false });
       this.uploadSinglePhoto(this.postPhotoOptions);
     }, (err) => {
      alert('Unable to take photo');
     });
  }
    
  uploadFromGallery(type){
    this.postPhoto.nativeElement.click();
  }
    
    processWebImage(event) {
    this.uploadPhoto(event.target.files);	  
    }
  
    async uploadSinglePhoto(params){
      let loading = await this.loadingCtrl.create({
        message: 'Uploading...'
      });
      loading.present();
       this.user.photoUploader(params).subscribe((resp) => {
        loading.dismiss();	
        this.publishPhotos.push(resp);
        this.publishStory.photos = JSON.stringify(this.publishPhotos);
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
    
    async uploadPhoto(params){
    let loading = await this.loadingCtrl.create({
      message: 'Uploading...'
    });
    loading.present();
    this.user.photoMultiUploader(params,this.postPhotoOptions.value).subscribe((resp) => {
      loading.dismiss();			
      if(this.publishPhotos.length > 0){
        for (var key in resp) {
          this.publishPhotos.push(resp[key]);
        }
      } else {
        this.publishPhotos = resp;
      }
      this.publishStory.photos = JSON.stringify(this.publishPhotos);
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
    
    removePhoto(index){
      var index = this.publishPhotos.indexOf(index);
      if (index > -1) {
        this.publishPhotos.splice(index, 1);
      }
      this.publishStory.photos = JSON.stringify(this.publishPhotos);
    }
    
    async postStory(){
     let loading = await this.loadingCtrl.create({
      message: 'Publish story...'
     });
        //Attempt to login in through our User service
      this.post.publishStory(this.publishStory).subscribe(async (resp) => {
        loading.dismiss();
        let toast = await this.toastCtrl.create({
          message: "Story has been successfully posted.",
          duration: 3000,
          position: 'top',
        });
        toast.present();
        this.closeModal();
      }, async (err) => {
        loading.dismiss();
        let toast = await this.toastCtrl.create({
          message: "Unable to story. Retry",
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.closeModal();
      });
    }

    closeModal(){
      this.navCtrl.pop();
    }

}
