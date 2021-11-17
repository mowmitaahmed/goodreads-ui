import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { DATABASE_KEY } from '../core/utils/global-variable';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { UiService } from './ui.service';
import {StorageService} from './storage.service';

const API_USER = environment.apiBaseLink + '/api/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token !: string | any;
  private isUser = false;
  private userStatusListener = new Subject<boolean>();
  // Hold The Count Time..
  private tokenTimer: any;

  constructor(
    private httpClient: HttpClient,
    private uiService: UiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cartService: CartService,
    private storageService: StorageService,
    private productService: ProductService
  ) //   private afAuth: AngularFireAuth,
  //   private bulkSmsService: BulkSmsService,
  {}

  /**
   * USER REGISTRATION
   */


  
  /**
   * AUTH SESSION
   * SAVE USER DATA
   * CLEAR USER DATA
   */

  
   protected clearUserData() {
    this.storageService.removeDataFromEncryptLocal(DATABASE_KEY.encryptUserLogin);
  }
  /**
   * MIDDLEWARE OF AUTH STATUS
   */
  getUserToken() {
    return this.token;
  }

  getUserStatusListener() {
    return this.userStatusListener.asObservable();
  }

  getUserStatus() {
    return this.isUser;
  }

    /**
   * User Logout
   */
     userLogOut() {
       
      this.token = null;
      this.isUser = false;
      this.userStatusListener.next(false);
      // Clear Token from Storage..
      this.clearUserData();
      // Clear The Token Time..
      clearTimeout(this.tokenTimer);
      // Navigate..
      this.router.navigate([environment.appBaseUrl]);
    }
}
