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

   userRegistration(data: User, redirectForm?: string) {
    this.httpClient.post<{ success: boolean; message: string; token: string; expiredIn: number }>
    (API_USER + 'registration', data)
      .subscribe(res => {
        if (res.success) {
          this.token = res.token;
          // Make User Auth True..
          this.spinner.hide();
          if (res.token) {
            this.onSuccessLogin(res.token, res.expiredIn, redirectForm, true);
          }

        } else {
          this.uiService.wrong(res.message);
          this.isUser = false;
          this.userStatusListener.next(false);
          this.spinner.hide();
        }
      }, () => {
        this.isUser = false;
        this.userStatusListener.next(false);
        this.spinner.hide();
      });
  }

  userLogin(data: { username: string, password: string }, redirectFrom?: string) {

    this.httpClient.put<{ success: boolean; message: string; token: string; expiredIn: number }>
    (API_USER + 'login', data)
      .subscribe(res => {
        if (res.success) {
          this.token = res.token;
          // Make User Auth True..
          if (res.token) {
            this.onSuccessLogin(res.token, res.expiredIn, redirectFrom);
          }
        } else {
          this.uiService.wrong(res.message);
          this.isUser = false;
          this.userStatusListener.next(false);
          this.spinner.hide();
        }

      }, () => {
        this.isUser = false;
        this.userStatusListener.next(false);
        this.spinner.hide();
      });
  }

  /**
   * ON SUCCESS LOGIN
   */

   private onSuccessLogin(token: string, expiredIn: number, redirectFrom?: string, fromRegistration?: boolean) {
    this.isUser = true;
    this.userStatusListener.next(true);

    // For Token Expired Time..
    const expiredInDuration = expiredIn;
    this.setSessionTimer(expiredInDuration);

    // Save Login Time & Expiration Time & Token to Local Storage..
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiredInDuration * 1000);
    this.saveUserData(token, expirationDate);

    // Snack bar..
    this.uiService.success('Welcome! Login Success.');
    // Spinner
    this.spinner.hide();

    // SYNC CART ITEM
    // this.getCarsItemFromLocal();

    // Navigate with Auth..
    if (redirectFrom) {
      this.router.navigate([redirectFrom]);
    } else {
      this.router.navigate([environment.userBaseUrl]);
    }
  }
    /**
   * User Auto Login
   */
     autoUserLoggedIn() {
      const authInformation = this.getUserData();
      if (!authInformation) {
        return;
      }
      const now = new Date();
      const expDate = new Date(authInformation.expiredDate);
      const expiresIn = expDate.getTime() - now.getTime();
  
      if (expiresIn > 0) {
        this.token = authInformation.token;
        this.userStatusListener.next(true);
        this.isUser = true;
        this.setSessionTimer(expiresIn / 10000);
      }
    }
  
  /**
   * AUTH SESSION
   * SAVE USER DATA
   * CLEAR USER DATA
   */

   private setSessionTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
    }, duration * 1000);
  }
  
  protected saveUserData(token: string, expiredDate: Date) {
    const data = {
      token,
      expiredDate
    };
    this.storageService.addDataToEncryptLocal(data, DATABASE_KEY.encryptUserLogin);

  }
  protected getUserData() {
    return this.storageService.getDataFromEncryptLocal(DATABASE_KEY.encryptUserLogin);

  }
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
