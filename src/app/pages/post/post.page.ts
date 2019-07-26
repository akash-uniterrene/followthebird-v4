import { Component, ViewChild,Input } from '@angular/core';
import { NavController, IonInfiniteScroll, Platform, ActionSheetController, ToastController, MenuController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { CommentsPage } from '../comments/comments.page';
@Component({
  selector: 'app-post',
  templateUrl: 'post.page.html',
  styleUrls: ['post.page.scss']
})
export class PostPage {
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
	@Input('handle') handle;
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
  
  constructor(
		public navCtrl: NavController, 
		public toastCtrl: ToastController,
		private camera: Camera,
		public actionSheetCtrl: ActionSheetController,
		public menu: MenuController,
		public modalCtrl: ModalController,
		private transfer: FileTransfer,
		private file: File,
		private platform: Platform,
		private alertCtrl: AlertController,	
		private post: PostService,
		public user: UserService,
		public router: Router
	) {
		platform.ready().then((readySource) => {
			this.width = platform.width();
			this.height = platform.height();
		});
  }
  
  ngOnInit(){
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
	
	getPeopleYouMayKnow(){
		this.user.getPeopleYouMayKnow('may_know',parseInt(localStorage.getItem('user_id')))
		.then(data => {
			this.usermayknow = data[0];
		});
	}

	getStories(){
		this.user.getStories({user_id:localStorage.getItem('user_id')})
		.then(data => {
			this.stories = data[0];
			console.log("stories",data)
		});
	}

	viewStory(story){
		this.router.navigate(['/StoryPage',{story: story}]);
	}

	viewPost(post) {
		if(post.photos_num == '1'){
			this.router.navigate(['/view-photo',{photo: post.photos[0]}]);
		} else {	
			this.router.navigate(['/view-post',{post: post}]);
		}
	}

	viewProfile(post) {
		if(post.user_type == 'user'){
			this.router.navigate(['/profile',{user_name: post.user_name,user_id:post.user_id}]);
		}
		if(post.user_type == 'page'){
			this.router.navigate(['/PageProfilePage',{pageProfile:post}]);
		}
		if(post.user_type == 'group'){
			this.router.navigate(['/GroupProfilePage',{groupProfile:post}]);
		}	
		if(post.user_type == 'event'){
			this.router.navigate(['/EventProfilePage',{eventProfile:post}]);
		}			
	} 

downloadAttachment(filePath){
	let arr = filePath.split('/');
	var filename = arr.pop();
	let url = encodeURI(filePath);  
	const fileTransfer: FileTransferObject = this.transfer.create();
	fileTransfer.download(this.mediapath+filePath, this.file.dataDirectory + filename).then((entry) => {
	let toast = this.toastCtrl.create({
		message: "Attachment bas been download",
		duration: 3000,
		position: 'top'
	});
	}, (error) => {
	// handle error
	 let toast = this.toastCtrl.create({
		message: "Downloading failure! retry.",
		duration: 3000,
		position: 'top'
	});
 });
}

async viewComments(index,comments,post_id){
	console.log("hi");
	const modal = await this.modalCtrl.create({
		component: CommentsPage,
		componentProps: {
			'comments': JSON.stringify(comments),
			'post_id': post_id,
			'handle': 'post'
		  }
	});
	await modal.present();
}

async sharePostCtrl(post_id)
{
let prompt = await this.alertCtrl.create({
	message: 'Share this post',	
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
		console.log("cancel clicked");
		}
	},
	{
		text: "Share",
		handler: data => {
			this.sharePost('share',post_id);
		}
	}]});
	await prompt.present();
}

	async postActivity(event,post)
{
	let  buttons : any = [
		{
			icon: !this.platform.is('ios') ? 'ios-bookmark' : null,	
			text: 'Save Post',
			handler: () => {
			this.reactAction('save_post',post.post_id);
			}
		}
	];	
	if(post.author_id != localStorage.getItem('user_id')){
		let report : any = {
			icon: !this.platform.is('ios') ? 'ios-flag' : null,		
			text: 'Report Post',
			handler: () => {
				this.reportAction("post",post.post_id)
			}
		};
		
		let hide : any = {
			icon: !this.platform.is('ios') ? 'ios-eye-off' : null,		
			text: 'Hide Post',
			handler: () => {
			event.target.parentNode.parentNode.parentNode.parentNode.remove();
			this.reactAction("hide_post",post.post_id)
			}
		};	
		buttons.push(report);
		buttons.push(hide);
	}
	if(post.author_id == localStorage.getItem('user_id')){
		let btn : any = {
			icon: !this.platform.is('ios') ? 'ios-trash' : null,		
			text: 'Delete Post',
			handler: async () => {
			const confirm = await this.alertCtrl.create({
				header: 'Delete post?',
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
					event.target.parentNode.parentNode.parentNode.parentNode.remove();
					this.reactAction("delete_post",post.post_id)
					}
				}
				]
			});
			await confirm.present();  
			}
		};
		buttons.push(btn);
	}
	const actionSheet = await this.actionSheetCtrl.create({
		buttons
	});
	await actionSheet.present();
}

getBackgroundStyle(url) {
	if(!url){
		return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
	} else {
		return 'url(' + this.mediapath+url + ')'
	}
}

getStoryBackgroundStyle(media) {
	
	if(media != 'null'){
		console.log(media);
		let obj = JSON.parse(media)
		return 'url(' + this.mediapath+obj[0].src + ')'
	} else {
		return 'url(assets/followthebirdImgs/story_background.png)'
	}
	
}

getMedia(media) {
	let obj = JSON.parse(media)
	return this.mediapath+obj[0].src;
}

sharePost(type,id){
	this.post.sharePost({'do':type,id:id,my_id:localStorage.getItem('user_id')}).subscribe(async (resp) => {
		const toast = await this.toastCtrl.create({
		message: "Post has been shared successfully",
		duration: 3000,
		position: 'top'
	});
	toast.present();	
}, async (err) => {
	const toast = await this.toastCtrl.create({
		message: "Unable to post. Retry",
		duration: 3000,
		position: 'top',
	});
	toast.present();
  });
}

reactAction(type,post_id){
	let params :any = {
		'do': type,
		'id': post_id,
		'my_id' : localStorage.getItem('user_id')
	};
	this.post.reaction(params).subscribe((resp) => {						
	
	}, (err) => {

 	});
}


reportAction(handle,id){
	let params :any = {
		'handle': handle,
		'id': id,
		'my_id' : localStorage.getItem('user_id')
	};
	this.user.report(params).subscribe(async (resp) => {						
		const toast = await this.toastCtrl.create({
		message: "Report has been submitted successfully",
		duration: 3000,
		position: 'top'
		});
		toast.present();
	}, async (err) => {
		const toast = await this.toastCtrl.create({
		message: "Failed to Submit Report. Please Try Again",
		duration: 3000,
		position: 'top',
		});
		toast.present();
	});
}

AddStory(){
	this.router.navigate(['/AddStoryPage']);
}

	getLiveLitePost(){
		let items :any = {
			type:'newsfeed',
			user_id:localStorage.getItem('user_id'),
			last_post_live:localStorage.getItem('last_post_live')
		}
		this.user.getLiveLitePost(items).then((data) => {	
			let item : any = data;
			if(item.length > 0){
				localStorage.setItem('last_post_live',data[0].post_id);
				for (var key in item) {
					this.postFeeds.unshift(item[key]);
				}
			}
		}, (err) => {
				
		});	
	}	
  
}