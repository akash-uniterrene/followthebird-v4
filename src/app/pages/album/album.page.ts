import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../service/album.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  private album_id = '';
  public photoAlbum :any = [];
  private imageURL = "https://followthebirds.com/content/uploads/";
  constructor(
    public album: AlbumService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.album_id = this.activatedRoute.snapshot.paramMap.get('album_id');
   }

  ngOnInit() {
    this.album.getAlbum(parseInt(localStorage.getItem('user_id')),{'id':this.album_id})
		.then(data => {
			this.photoAlbum = data;
    });
  }

  getBackgroundStyle(url) {
		if(!url){
			return 'url(assets/followthebirdImgs/no-profile-img.jpeg)'
		} else {
			return 'url(' + this.imageURL+url + ')'
		}
  }
  viewImage(photo){
    this.router.navigate(['/view-photo',{photo: JSON.stringify(photo)}]);
  }

}
