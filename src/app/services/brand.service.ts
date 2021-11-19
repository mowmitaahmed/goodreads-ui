import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Brand} from '../interfaces/brand';
import {ProductBrand} from '../interfaces/product-brand';
import {Pagination} from '../interfaces/pagination';
import {Observable} from 'rxjs';

const API_BRAND = environment.apiBaseLink + '/api/brand/';
const API_URL_TOP_BRAND = environment.apiBaseLink + '/api/top-brands/';
const API_URL_OTHER_BRAND = environment.apiBaseLink + '/api/top-brands/';

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
  addBrand(data: ProductBrand) {
    return this.httpClient.post<{ message: string }>(API_BRAND + 'add-brand', data);
  }

  insertManyBrand(data: ProductBrand[]) {
    return this.httpClient.post<{ message: string }>(API_BRAND + 'add-multiple-brand', data);
  }


  getAllBrands(pagination?: Pagination, select?: string, isFeatured?: boolean) {
    let params = new HttpParams();
    if (pagination) {
      params = params.append('pageSize', pagination.pageSize);
      params = params.append('page', pagination.currentPage);
    }
    if (select) {
      params = params.append('select', select);
    }

    if (isFeatured) {
      params = params.append('isFeatured', isFeatured);
    }

    return this.httpClient.get<{ data: ProductBrand[], message?: string, count: number }>(API_BRAND + 'get-all-brands', {params});
  }


  getBrandByBrandID(id: string) {
    return this.httpClient.get<{ data: ProductBrand, message?: string }>(API_BRAND + 'get-brand-by-brand-id/' + id);
  }

  editBrandData(data: ProductBrand) {
    return this.httpClient.put<{ message?: string }>(API_BRAND + 'edit-brand-by-brand', data);
  }

  getBrandBySearch(id: string) {
    return this.httpClient.get<{ data: ProductBrand, message?: string }>(API_BRAND + 'get-brand-by-search/' + id);
  }

  deleteBrand(id: string) {
    return this.httpClient.delete<{ message?: string }>(API_BRAND + 'delete-brand-by-id/' + id);
  }

  getSearchBrands(searchTerm: string, pagination?: Pagination) {
    const paginate = pagination;
    let params = new HttpParams();
    params = params.append('q', searchTerm);
    params = params.append('pageSize', pagination.pageSize);
    params = params.append('currentPage', pagination.currentPage);
    return this.httpClient.post<{ data: ProductBrand[], count: number }>(API_BRAND + 'get-brands-by-search', paginate, {params});
  }


  /**
   * Additional BRAND
   */

  getAllPromotionalBrands() {
    return this.httpClient.get<{ data: Brand[] }>(API_URL_TOP_BRAND + 'get-all-promotional-brands/');
  }

  getAllOtherBrands() {
    return this.httpClient.get<{ data: Brand[], count: number }>(API_URL_OTHER_BRAND + 'get-all-brands/');
  }

  /**
   * Get No Repeat Data
   */

  getAllBrandsNoRepeat(pagination?: Pagination, select?: string): Observable<{ data: ProductBrand[] }> {
    return new Observable((observer) => {
      if (this.allBrands.length > 0) {
        observer.next({data: this.allBrands});
        observer.complete();
      } else {
        let params = new HttpParams();
        if (pagination) {
          params = params.append('pageSize', pagination.pageSize);
          params = params.append('page', pagination.currentPage);
        }
        if (select) {
          params = params.append('select', select);
        }
        this.httpClient.get<{ data: ProductBrand[] }>(API_BRAND + 'get-all-brands', {params})
          .subscribe((res) => {
            this.allBrands = res.data;
            observer.next({data: this.allBrands});
            observer.complete();
          }, error => {
            console.log(error);
          });
      }
    });
  }

}
