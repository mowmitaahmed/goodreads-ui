import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProductCategory} from '../interfaces/product-category';
import {Pagination} from '../interfaces/pagination';
import {Observable} from 'rxjs';


const API_CATEGORY = environment.apiBaseLink + '/api/product-category/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: ProductCategory[] = [];

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * CATEGORY
   */




  /**
   * Get No Repeat Data
   */




}
