import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Pagination} from '../../interfaces/pagination';
import {CategoryService} from 'src/app/services/category.service';
import {Product} from '../../interfaces/product';
import {ProductCategory} from '../../interfaces/product-category';

import {NgxSpinnerService} from 'ngx-spinner';
import {MatRadioChange} from '@angular/material/radio';
import {BrandService} from '../../services/brand.service';
import {ProductBrand} from '../../interfaces/product-brand';
import {MatSliderChange} from '@angular/material/slider';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // SUBSCRIPTION
  private subProduct ?: Subscription;
  private subAcRoute ?: Subscription;
  private subCat ?: Subscription;


  // View Type
  viewType = 'grid';

  // Store Data
  products: Product[] = [];

  // Query
  query: any = null;

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 16;
  // totalProductsStore = 0;


  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    // GET PAGE FROM QUERY PARAM
    this.subAcRoute = this.activatedRoute.queryParams.subscribe(qParam => {
      if (qParam && qParam.page) {
        this.currentPage = qParam.page;
      } else {
        this.currentPage = 1;
      }
      this.getAllProducts();
    });

  }

    /**
   * HTTP REQ HANDLE
   */

     private getAllProducts() {
      this.spinner.show();

      const pagination: Pagination = {
        pageSize: this.productsPerPage.toString(),
        currentPage: this.currentPage.toString()
      };
  
      const mQuery = {...{productVisibility: true}, ...this.query};
  
      this.subProduct = this.productService.getAllProducts(pagination,mQuery).subscribe(res => {
          this.products = res.data;
          this.totalProducts = res.count;
          // const min = res.priceRange.minPrice;
          // const max = res.priceRange.maxPrice;
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          console.log(error);
        });
    }

    /**
   * PAGINATION CHANGE
   */
     public onPageChanged(event: any) {
      this.router.navigate([], {queryParams: {page: event}});
    }

ngOnDestroy() {

  if (this.subAcRoute) {
    this.subAcRoute.unsubscribe();
  }
  if (this.subProduct) {
    this.subProduct.unsubscribe();
  }
  if (this.subCat) {
    this.subCat.unsubscribe();
  }
}
}
