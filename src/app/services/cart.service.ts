import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Cart} from '../interfaces/cart';
import {DATABASE_KEY} from '../core/utils/global-variable';
// import {ReloadService} from './reload.service';


const API_CART = environment.apiBaseLink + '/api/cart/';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private httpClient: HttpClient,
    // private reloadService: ReloadService,
  ) {
  }
}