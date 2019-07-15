import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private transfer: FileTransfer, public platform: Platform, public file: File ) { }
  fileTransfer: FileTransferObject = this.transfer.create();
  createFolder(){
	this.platform.ready().then(() =>{
		if(this.platform.is('android')) {
			this.file.checkDir(this.file.dataDirectory, 'FollowTheBirds').then(response => {
			}).catch(err => {
				this.file.createDir(this.file.dataDirectory, 'FollowTheBirds', false).then(response => {
					this.file.createDir(this.file.dataDirectory, 'FollowTheBirds/ProfilePic', false);
					this.file.createDir(this.file.dataDirectory, 'FollowTheBirds/CoverPic', false);
					this.file.createDir(this.file.dataDirectory, 'FollowTheBirds/Vault', false);
					this.file.createDir(this.file.dataDirectory, 'FollowTheBirds/ShareImage', false);
				}).catch(err => {
				
				}); 
			});
		}
	});
  }
  
   setUser(user : any){
		for (var key in user) {
		  if (user.hasOwnProperty(key)) {          
			  localStorage.setItem(key,user[key])
		  }
		}
	}
  
	imageDownload(url,folder){
	  /* let image = []
	  var arr = url.split("/");
	  var pic_name = arr[arr.length - 1];
	  const absurl = this.imageURL+url;
	  this.fileTransfer.download(absurl, this.file.dataDirectory + 'FollowTheBirds/'+folder+'/'+pic_name).then((entry) => {
		return new Promise(resolve => {
			return true;
		});  
	  }, (error) => {
		console.log(error);
	  }); */
	}
}
