import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  _user: any;
  private imageURL = "https://followthebirds.com/content/uploads/";
  constructor(
    public api: ApiService,
    private file: File,
    private transfer : FileTransfer
  ) { }
    fileTransfer: FileTransferObject = this.transfer.create();
	
    login(accountInfo: any) {
      let seq = this.api.post('sign_in', accountInfo);
  
      seq.subscribe((res: any) => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          this._loggedIn(res);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });
  
      return seq;
    }

    /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
