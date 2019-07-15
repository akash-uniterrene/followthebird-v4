import { Component, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, IonInfiniteScroll, Platform } from '@ionic/angular';
import { PostService } from '../../service/post.service';
@Component({
  selector: 'app-post',
  templateUrl: 'post.page.html',
  styleUrls: ['post.page.scss']
})
export class PostPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  countCarItem = 99;
  badgeCount = 6;
  postFeeds: any = [];
  post_type: any = {
	shared: 'shared',
	link: 'shared a link',
	poll: 'created a poll',
	product: 'added new product for sell',
	article: 'added new article',
	video : 'added a video',
	audio: 'added an audio',
	file: 'added a file',
	photos: 'added a photo',
	profile_picture_male: 'updated his profile picture',
	profile_picture_female: 'updated her profile picture',
	profile_cover_male: 'updated his cover photo',
	profile_cover_female: 'updated her cover photo',
	page_picture: 'updated page picture',
	page_cover: 'updated cover photo',
	group_picture: 'updated group picture',
	group_cover: 'updated group cover',
	event_cover: 'updated event cover'
  };  
  sub : any = '';
  slidesPerView : number = 1;
  public postElement = [];
  public sharedInfo = [];
  private pageCount = 2;
  private arrayPosition = 0;
  private isAndroid = false;
  private mediapath = "https://followthebirds.com/content/uploads/";
  usermayknow : any = [];
  stories : any = [];
  height : number = 300;
  width : number = 300;
  private user_picture = localStorage.getItem('user_picture');
	slideOpts = {
	initialSlide: 3,
	speed: 400
  };
  
  constructor(public platform: Platform,public post: PostService) {
	platform.ready().then((readySource) => {
		this.width = platform.width();
		this.height = platform.height();
	});
  }
  
  ngOnInit(){
	console.log("hi");
	this.getStories();
	this.isAndroid = this.platform.is("android");
	this.postElement['handle'] = "me";
	this.postElement['id'] = '';  
	this.post.getfeeds('newsfeed',localStorage.getItem('user_id'),localStorage.getItem('user_id'),{})
	.then(data => {
	  this.postFeeds = [];
	  let item = data[0];
	  localStorage.setItem('last_post_live',item[0].post_id);
	  for (var key in item) {
		if(item[key].post_type == 'photos'){
			this.post_type.photos = "added "+item[key].photos_num+"photos";
		}
		this.postFeeds.push(item[key]);
	  }
	  console.log("hi"+this.postFeeds);
	});			
  }
	
	
  doInfinite(event) {
	setTimeout(() => {
       this.post.getfeeds('newsfeed',localStorage.getItem('user_id'),localStorage.getItem('user_id'),{'page': this.pageCount})
		.then(data => {			
			if(data[0].length > 0) {
				let item = data[0];
				for (var key in item) {
				  this.postFeeds.push(item[key]);
				}
			}
		});
	  this.pageCount = this.pageCount + 1;
      event.target.complete();
    }, 500);
	
	
  }
  
  
  doRefresh(event) {
	this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
  getBackgroundStyle(url) {
	if(!url){
		return 'url(http://www.sclance.com/pngs/avatar-png/avatar_png_71508.png)'
	} else {
		return 'url(' + this.mediapath+url + ')'
	}
  }
  
  getStoryBackgroundStyle(media) {
	if(media != 'null'){
	  let obj = JSON.parse(media);
	  return 'url(' + this.mediapath+obj[0].src + ')'
	} else {
		return 'url(http://www.sclance.com/pngs/avatar-png/avatar_png_71508.png)'
	}
  }
	
  getMedia(media) {
	let obj = JSON.parse(media)
	return this.mediapath+obj[0].src;
  }
  
  getStories(){
	  
  }
}