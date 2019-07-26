import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController, Platform, MenuController, LoadingController } from '@ionic/angular';
import { UserService } from '../../service/user.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  page="0";
  photos : any = [];
  albums : any = [];
	private profile_id;
	photoalbum: string = "uploads";
  private imageURL = "https://followthebirds.com/content/uploads/";
  private pageCount = 2;
  private arrayPosition = 0;
  constructor(
    public user: UserService,
    public toastCtrl: ToastController,
    public platform: Platform, 
    public menu: MenuController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
		public router: Router,
		private activatedRoute: ActivatedRoute
  ) { this.profile_id = this.activatedRoute.snapshot.paramMap.get('user_id') || localStorage.getItem('user_id'); }

  ngOnInit() {
    this.user.getphotos(parseInt(localStorage.getItem('user_id')),{'type':'user','id':this.profile_id})
    .then(data => {
      let item = data[0];
      for (var key in item) {
        this.photos.push(item[key]);
      }
      console.log(this.photos);
    });
    
    this.user.getalbums(parseInt(localStorage.getItem('user_id')),{'type':'user','id':this.profile_id})
    .then(data => {
      let item = data[0];
      for (var key in item) {
        this.albums.push(item[key]);
      }
    });
  }

  viewImage(photo){
    this.router.navigate(['/view-photo',{photo: JSON.stringify(photo)}]);
  }    
    
  getAlbum(album_id){
      this.router.navigate(['/album',{'album_id':album_id}]);
  }
    
  getBackgroundStyle(url) {
    if(!url){
      return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
    } else {
      return 'url(' + this.imageURL+url + ')'
    }
  } 

  doInfinitePhotos(infiniteScroll) {  
    setTimeout(() => {
      this.user.getphotos(parseInt(localStorage.getItem('user_id')),{'type':'user','id':this.profile_id,'page': this.pageCount})	
      .then(data => {
        
        let item = data[0];
        console.log(data);
        for (var key in item) {
          this.photos.push(item[key]);
        }
        
        console.log(this.photos);
      });
      this.pageCount = this.pageCount + 1;
      infiniteScroll.complete();
    }, 500);
  }
}
