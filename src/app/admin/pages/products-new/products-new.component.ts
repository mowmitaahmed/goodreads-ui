import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Pagination} from '../../../interfaces/pagination';
import {FilterData, Product} from '../../../interfaces/product';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY, Subscription} from 'rxjs';
import {ProductCategory} from '../../../interfaces/product-category';
// import {ProductSubCategory} from '../../../interfaces/product-sub-category';
import {NgForm} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {NgxSpinnerService} from 'ngx-spinner';
import {CategoryService} from '../../../services/category.service';
// import {SubCategoryService} from '../../../services/sub-category.service';
import {debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';
import {MatOption, MatOptionSelectionChange} from '@angular/material/core';
import {MatDialog} from '@angular/material/dialog';
import {ReloadService} from '../../../services/reload.service';
import {ConfirmDialogComponent} from '../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {UiService} from '../../../services/ui.service';
import * as XLSX from 'xlsx';
import {UtilsService} from '../../../services/utils.service';
// import {DownloadJsonDialogComponent} from '../../../shared/dialog-view/download-json-dialog/download-json-dialog.component';
import {Select} from '../../../interfaces/select';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.scss']
})
export class ProductsNewComponent implements OnInit, AfterViewInit, OnDestroy {

  // Subscriptions
  private subProduct: Subscription;
  private subCat: Subscription;
  private subSubCat: Subscription;
  private subAcRoute: Subscription;
  private subForm: Subscription;

  // Store Data
  products: Product[] = [];
  private holdPrevData: any[] = [];
  categories: ProductCategory[] = [];
  // subCategories: ProductSubCategory[] = [];
  stockTypes: Select[] = [
    {value: {quantity: {$gt: 0}}, viewValue: 'Stock In'},
    {value: {quantity: {$lte: 0}}, viewValue: 'Stock Out'},
  ];

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 10;
  totalProductsStore = 0;

  // SEARCH AREA
  searchProducts: Product[] = [];
  isLoading = false;
  isSelect = false;
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  // Query
  query: any = null;

  // Select View Child
  @ViewChild('matCatSelect') matCatSelect: MatSelect;
  @ViewChild('matSubCatSelect') matSubCatSelect: MatSelect;

  // DOWNLOADABLE
  dataTypeFormat = 'excel';

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    // private subCategoryService: SubCategoryService,
    private dialog: MatDialog,
    private reloadService: ReloadService,
    private uiService: UiService,
    private utilsService: UtilsService,
  ) {
  }

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

    // OBSERVABLE
    this.reloadService.refreshProduct$
      .subscribe(() => {
        this.getAllProducts();
      });

    // GET
    this.getAllCategory();
  }

  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;

    this.subForm = formValue.pipe(
      // map(t => t.searchTerm)
      // filter(() => this.searchForm.valid),
      pluck('searchTerm'),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(data => {
        this.searchQuery = data;
        if (this.searchQuery === '' || this.searchQuery === null) {
          this.searchProducts = [];
          this.products = this.holdPrevData;
          this.totalProducts = this.totalProductsStore;
          this.searchProducts = [];
          this.searchQuery = null;
          return EMPTY;
        }
        this.isLoading = true;
        const pagination: Pagination = {
          pageSize: this.productsPerPage.toString(),
          currentPage: this.currentPage.toString()
        };
        return this.productService.getSearchProduct(data, pagination);
      })
    )
      .subscribe(res => {
        this.isLoading = false;
        this.searchProducts = res.data;
        this.products = this.searchProducts;
        this.totalProducts = res.count;
        this.currentPage = 1;
        this.router.navigate([], {queryParams: {page: this.currentPage}});
      }, error => {
        this.isLoading = false;
      });
  }

  /**
   * COMPONENT DIALOG VIEW
   */
  public openConfirmDialog(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want delete this product?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteProductById(id);
      }
    });
  }

  public openConfirmUploadDialog(data: Product[]) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Import Data!',
        message: 'Warning! All the existing data will be replace'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.updateMultipleProductById(data);
      }
    });
  }


  /**
   * HTTP REQ
   */

  private getAllProducts() {
    this.spinner.show();

    const pagination: Pagination = {
      pageSize: this.productsPerPage.toString(),
      currentPage: this.currentPage.toString()
    };

    this.subProduct = this.productService.getAllProducts(pagination, this.query)
      .subscribe(res => {
        this.products = res.data;
        console.log(res.data);
        this.holdPrevData = res.data;
        this.totalProducts = res.count;
        this.totalProductsStore = res.count;
        this.spinner.hide();

      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private getAllCategory() {
    this.subCat = this.categoryService.getAllCategory()
      .subscribe(res => {
        this.categories = res.data;
      }, error => {
        console.log(error);
      });
  }

  // private getAllSubCategory(categoryId: string) {
  //   this.subSubCat = this.subCategoryService.getSubCategoryByCategoryId(categoryId)
  //     .subscribe(res => {
  //       this.subCategories = res.data;
  //     }, error => {
  //       console.log(error);
  //     });
  // }


  private insertManyProduct(data: Product[]) {
    this.spinner.show();
    this.productService.insertManyProduct(data)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshProduct$();
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }

  private updateMultipleProductById(data: any[]) {
    this.spinner.show();
    this.productService.updateMultipleProductById(data)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshProduct$();
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }

  private deleteProductById(productId: string) {
    this.spinner.show();
    this.productService.deleteProductById(productId)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshProduct$();
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


  /**
   * SELECTION CHANGE
   * FILTER
   */
  onSelectCategory(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      const category = event.source.value as ProductCategory;
      this.query = {category: category._id};
      // this.getAllSubCategory(category._id);
      if (this.currentPage > 1) {
        this.router.navigate([], {queryParams: {page: 1}});
      } else {
        this.getAllProducts();
      }
    }
  }

  // onSelectSubCategory(event: MatOptionSelectionChange) {
  //   if (event.isUserInput) {
  //     const subCategory = event.source.value as ProductSubCategory;
  //     this.query = {...this.query, ...{subCategory: subCategory._id}};
  //     if (this.currentPage > 1) {
  //       this.router.navigate([], {queryParams: {page: 1}});
  //     } else {
  //       this.getAllProducts();
  //     }
  //   }
  // }

  onSelectStockType(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      this.query = event.source.value;
      if (this.currentPage > 1) {
        this.router.navigate([], {queryParams: {page: 1}});
      } else {
        this.getAllProducts();
      }
    }
  }

  /**
   * ON REMOVE
   */
  onClearFilter() {
    this.matCatSelect.options.forEach((data: MatOption) => data.deselect());
    this.matSubCatSelect.options.forEach((data: MatOption) => data.deselect());
    this.query = null;
    this.router.navigate([], {queryParams: {page: null}, queryParamsHandling: 'merge'});
    this.getAllProducts();
  }

  /**
   * IMPORT EXCEL DATA
   * FILE CHANGE EVENT
   */

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    if (this.dataTypeFormat === 'excel') {
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, {type: 'binary'});
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});

        // Modify Attributes
        const allData = jsonData.products;
        const mData: Product[] = allData.map(m => {
          const dataNameFieldString = m.productName.toString().trim();
          return {
            ...m,
            ...{
              productSlug: this.utilsService.transformToSlug(dataNameFieldString),
              campaignStartDate: m.campaignStartDate ? this.excelDateToJSDate(m.campaignStartDate) : null,
              campaignEndDate: m.campaignEndDate ? this.excelDateToJSDate(m.campaignEndDate) : null,
            }
          } as Product;
        });
        this.openConfirmUploadDialog(mData);
      };

      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file, 'UTF-8');
      reader.onload = () => {
        const products = JSON.parse(reader.result.toString());
        const mProducts: Product[] = products.map(m => {
          const dataNameFieldString = m.productName.toString().trim();
          return {
            ...m,
            ...{productSlug: this.utilsService.transformToSlug(dataNameFieldString)}
          } as ProductCategory;
        });
        this.openConfirmUploadDialog(mProducts);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  }

  protected getFilterStringToMain(str: string): FilterData[] | null {
    if (str) {
      const testStr = '{ "_id": "60e04834a320de0484f97116", "attributeValues": "1.21-1.28", "attributeName": "COOLING INPUT POWER (KW)	"}';
      const cArray = str.split('#');
      const mTestStr = testStr.split(/\s/).join('');

      // const obj = {};
      // properties.forEach(property => {
      //   const mProperty = property.trim();
      //   // console.log(mProperty);
      //   const tup = mProperty.split(':');
      //   obj[tup[0]] = tup[1];
      // });
      // console.log(obj as ProductAttribute);


      return cArray.map(m => {
        // console.log(m);
        // const h = JSON.parse(m);
        // console.log(h);
        // @ts-ignore
        // const g = Object.fromEntries(m.split(',').map(i => i.split(':')));
        // console.log(m);
        // tslint:disable-next-line:no-eval
        // const evalData = eval(m);
        // console.log(evalData);
        return null;
      }) as FilterData[];
    } else {
      return null;
    }

  }

  exportDataToFile() {
    if (this.dataTypeFormat === 'json') {
      // this.exportAsAJson();
    } else {
      this.exportToExcel();
    }
  }


  /**
   * EXPORTS TO EXCEL
   */
  exportToExcel() {
    this.spinner.show();
    this.productService.getAllProducts(null, null)
      .subscribe(res => {
        const allData = res.data as Product[];
        console.log(allData);
        const mData = allData.map(m => {
          return {
            _id: m._id,
            productName: m.productName,
            sku: m.sku,
            // price: m.price,
            discountType: m.discountType,
            discountAmount: m.discountAmount,
            quantity: m.quantity,
            stockVisibility: m.stockVisibility,
            productVisibility: m.productVisibility,
            campaignStartDate: m.campaignStartDate ? this.utilsService.getDateString(m.campaignStartDate) : null,
            campaignEndDate: m.campaignStartDate ? this.utilsService.getDateString(m.campaignEndDate) : null
          };
        });

        const date = this.utilsService.getDateString(new Date());
        // EXPORT XLSX
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'products');
        XLSX.writeFile(wb, `Products_Base_${date}.xlsx`);
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  /**
   * DOWNLOADABLE JSON
   */
  // exportAsAJson() {
  //   this.productService.getAllProducts(null, null)
  //     .subscribe(res => {
  //       const allData = res.data as Product[];
  //
  //       const blob = new Blob([JSON.stringify(allData, null, 2)], {type: 'application/json'});
  //       this.dialog.open(DownloadJsonDialogComponent, {
  //         maxWidth: '500px',
  //         data: {
  //           blobUrl: window.URL.createObjectURL(blob),
  //           backupType: 'products'
  //         }
  //       });
  //     }, error => {
  //       console.log(error);
  //     });
  //
  // }

  /**
   * CLONE PRODUCT
   */
  cloneProduct(data: Product) {
    delete data._id;
    delete data.ratingReview;
    delete data.createdAt;
    delete data.updatedAt;
    const productNewName = `${data.productName} (Clone) ${Date.now().toString().slice(0, 3)}`;
    data.productName = productNewName;
    data.productSlug = this.utilsService.transformToSlug(productNewName);

    this.productService.addSingleProduct(data)
      .subscribe(res => {
        this.uiService.success('Product Cloned Successfully. Please Check it First');
        this.reloadService.needRefreshProduct$();
      }, error => {
        console.log(error);
      });
  }

  /**
   * EXCEL DATE TO NORMAL DATE
   */
  excelDateToJSDate(serial: any) {
    if (typeof serial === 'string') {
      return this.utilsService.getDateWithCurrentTime(new Date(serial));
    } else {
      const utcDate = Math.floor(serial - 25569);
      const utcValue = utcDate * 86400;
      const dateInfo = new Date(utcValue * 1000);

      const fractionalDay = serial - Math.floor(serial) + 0.0000001;

      let totalSeconds = Math.floor(86400 * fractionalDay);

      const seconds = totalSeconds % 60;

      totalSeconds -= seconds;

      const hours = Math.floor(totalSeconds / (60 * 60));
      const minutes = Math.floor(totalSeconds / 60) % 60;

      const d = new Date(dateInfo.getFullYear(), dateInfo.getMonth(), dateInfo.getDate(), hours, minutes, seconds);
      return this.utilsService.getDateWithCurrentTime(d);

    }
  }

  /**
   * ON DESTROY
   */
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
    if (this.subSubCat) {
      this.subSubCat.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
  }


}