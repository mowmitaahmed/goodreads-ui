import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Pagination} from '../interfaces/pagination';
import {ProductUnitType} from '../interfaces/product-unit-type';


const API_TAG = environment.apiBaseLink + '/api/unit-type/';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * TAG
   */
  addUnitType(data: ProductUnitType) {
    return this.httpClient.post<{ message: string }>(API_TAG + 'add-single-unit-type', data);
  }

  insertManyUnitType(data: ProductUnitType[]) {
    return this.httpClient.post<{message: string}>(API_TAG + 'add-multiple-unit-type', data);
  }


  getAllUnitTypes(pagination?: Pagination) {
    if (pagination) {
      let params = new HttpParams();
      params = params.append('pageSize', pagination.pageSize);
      params = params.append('page', pagination.currentPage);
      return this.httpClient.get<{ data: ProductUnitType[], message?: string, count: number }>(API_TAG + 'get-all-unit-types', {params});
    } else {
      return this.httpClient.get<{ data: ProductUnitType[], message?: string, count: number }>(API_TAG + 'get-all-unit-types');
    }

  }


  getUnitTypeByUnitTypeId(id: string) {
    return this.httpClient.get<{ data: ProductUnitType, message?: string }>(API_TAG + 'get-unit-type-by-unit-type-id/' + id);
  }

  editUnitTypeData(data: ProductUnitType) {
    return this.httpClient.put<{message?: string}>(API_TAG + 'edit-unit-type-by-unit-type', data);
  }

  deleteUnitType(id: string) {
    return this.httpClient.delete<{ message?: string }>(API_TAG + 'delete-unit-type-by-id/' + id);
  }


  getSearchUnitType(searchTerm: string, pagination?: Pagination) {
    const paginate = pagination;
    let params = new HttpParams();
    params = params.append('q', searchTerm);
    params = params.append('pageSize', pagination.pageSize);
    params = params.append('currentPage', pagination.currentPage);
    return this.httpClient.post<{ data: ProductUnitType[], count: number }>(API_TAG + 'get-unit-types-by-search', paginate, {params});
  }

  // router.post('/get-unit-types-by-search', controller.getUnitTypesBySearch);



}
