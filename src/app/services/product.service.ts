import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../interfaces/product';
import {Pagination} from '../interfaces/pagination';
import {ProductFilter} from '../interfaces/product-filter';
import {UiService} from './ui.service';

const API_PRODUCT = environment.apiBaseLink + '/api/product/';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private uiService: UiService
  ) {
  }

  /**
   * PRODUCT
   */

  getAllProducts(paginate: Pagination, sort: any ) {
    return this.http.post<{success: boolean; data: Product[]; count: number}>(API_PRODUCT + 'get-all-products', {paginate, sort})
  }

  getSingleProductBySlug(slug: string) {
    return this.http.get<{ data: Product, message: string }>(API_PRODUCT + 'get-single-product-by-slug/' + slug);
  }
}