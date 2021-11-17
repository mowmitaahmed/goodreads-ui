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

    /**
   * ENCRYPT STORAGE
   */
  
     removeDataFromEncryptLocal(key: string) {
        encryptStorage.removeItem(key);
      }
}