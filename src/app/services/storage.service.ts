import {Injectable} from '@angular/core';
import {EncryptStorage} from 'encrypt-storage';
import {CookieService} from 'ngx-cookie-service';
import {DATABASE_KEY} from '../core/utils/global-variable';
// import {RecommendedProductData} from '../interfaces/recommendedProductsData';
import {environment} from '../../environments/environment';

// Encrypt
const encryptStorage = new EncryptStorage(environment.storageSecret);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private cookieService: CookieService
  ) {
  }


  storeDataToSessionStorage(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getDataFromSessionStorage(key: string): any {
    const data = sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  removeSessionData(key: string) {
    sessionStorage.removeItem(key);
  }
    /**
   * ENCRYPT STORAGE
   */
  addDataToEncryptLocal(data: any, key: string) {
    encryptStorage.setItem(key, data);
  }
  
  getDataFromEncryptLocal(key: string) {
    return encryptStorage.getItem(key);
  }
  
     removeDataFromEncryptLocal(key: string) {
        encryptStorage.removeItem(key);
      }

      

  /**
   * DYNAMIC SESSION DATA
   */
  storeInputData(data: any, key: string) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getStoredInput(key: string): any {
    const data = sessionStorage.getItem(key);
    return JSON.parse(data);
  }
}