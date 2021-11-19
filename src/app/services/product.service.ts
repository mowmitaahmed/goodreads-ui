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

  addSingleProduct(data: any) {
    return this.http.post<{ message: string }>(API_PRODUCT + 'add-single-product', data);
  }

  insertManyProduct(data: any[]) {
    return this.http.post<{ message: string }>(API_PRODUCT + 'add-multiple-products', data);
  }

  updateMultipleProductById(data: any[]) {
    return this.http.post<{ message: string }>(API_PRODUCT + 'update-multiple-product-by-id', data);
  }


  getAllProducts(paginate: Pagination, filter?: ProductFilter, select?: string) {
    return this.http.post<{ data: Product[], priceRange: any, count: number, message: string }>(API_PRODUCT + 'get-all-products', {paginate, filter, select});
  }


  getProductsByDynamicSort(paginate: Pagination, sort: any, filter?: ProductFilter) {
    return this.http.post<{ data: Product[], priceRange: any, count: number }>(API_PRODUCT + 'get-products-by-dynamic-sort', {paginate, sort, filter});
  }

  getProductList(paginate: Pagination, sort: any, filter?: ProductFilter, select?: string) {
    return this.http.post<{ data: Product[], priceRange: any, count: number }>(API_PRODUCT + 'get-product-list', {paginate, sort, filter, select});
  }



  getSingleProductBySlug(slug: string) {
    return this.http.get<{ data: any, message: string }>(API_PRODUCT + 'get-single-product-by-slug/' + slug);
  }

  getSingleProductById(id: string) {
    return this.http.get<{ data: any, message: string }>(API_PRODUCT + 'get-single-product-by-id/' + id);
  }

  editProductById(data: any) {
    return this.http.put<{ message: string }>(API_PRODUCT + 'edit-product-by-id', data);
  }

  deleteProductById(id: string) {
    return this.http.delete<{ message: string }>(API_PRODUCT + 'delete-product-by-id/' + id);
  }

  getRelatedProducts(data: any) {
    return this.http.get<{ data: any, message: string }>(API_PRODUCT + 'get-related-products/' + data.generic + '/' + data.id);
  }

  getRecommendedProducts(ids: any) {
    return this.http.post<{ data: any, message: string }>(API_PRODUCT + 'get-recommended-products/', {data: ids});
  }

  productFilterByQuery(query: any, paginate?: any, select?: any) {
    const data = {
      query,
      paginate,
      select
    };
    return this.http.post<{ data: Product[], priceRange: any, count: number, message: string }>(API_PRODUCT + 'product-filter-query', data);
  }

  getSearchProduct(searchTerm: string, pagination?: Pagination, filter?: any) {

    let params = new HttpParams();
    params = params.append('q', searchTerm);
    if (pagination) {
      params = params.append('pageSize', pagination.pageSize);
      params = params.append('currentPage', pagination.currentPage);
    }
    return this.http.post<{ data: Product[], count: number }>(API_PRODUCT + 'get-products-by-search', filter, {params});
  }


  getSpecificProductsById(ids: string[], select?: string) {
    return this.http.post<{ data: Product[] }>(API_PRODUCT + 'get-specific-products-by-ids', {ids, select});
  }

  /**
   * COMPARE LIST with LOCAL STORAGE
   */

  addToCompare(productId: string) {
    // console.log(product);
    const items = JSON.parse(localStorage.getItem('compareList'));

    let compareList;

    if (items === null) {
      compareList = [];
      compareList.push(productId);
      this.uiService.success('Product added to compare list');
    } else {
      compareList = items;
      const fIndex = compareList.findIndex((o) => o._id === productId);
      if (fIndex === -1) {
        if (compareList.length !== 3) {
          compareList.push(productId);
          this.uiService.success('Product added to compare list');
        } else {
          this.uiService.wrong('Your compare list is full');
        }
      } else {
        this.uiService.warn('This product already in compare list');
      }
    }
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }


  getCompareList(): string[] {
    const list = localStorage.getItem('compareList');
    if (list === null) {
      return [];
    }
    return JSON.parse(list) as string[];
  }

  deleteCompareItem(id: string) {
    const items = JSON.parse(localStorage.getItem('compareList'));
    const filtered = items.filter(el => el !== id);
    localStorage.setItem('compareList', JSON.stringify(filtered));
  }
}
