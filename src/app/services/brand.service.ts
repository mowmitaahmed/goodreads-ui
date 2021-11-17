import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
// import {Brand} from '../interfaces/brand';
import {ProductBrand} from '../interfaces/product-brand';
import {Pagination} from '../interfaces/pagination';
import {Observable} from 'rxjs';

const API_BRAND = environment.apiBaseLink + '/api/brand/';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  allBrands: ProductBrand[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
  }

  /**
   * BRAND
   */


  /**
   * Additional BRAND
   */



  /**
   * Get No Repeat Data
   */


}
