import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';

import {NgForm} from '@angular/forms';
import {Cart} from '../../interfaces/cart';
// import {UserDataService} from '../../services/user-data.service';
import {UserService} from '../../services/user.service';
// import {ReloadService} from '../../services/reload.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UiService} from 'src/app/services/ui.service';
import {PriceData, Product} from '../../interfaces/product';
import {CartService} from '../../services/cart.service';

import {NgxSpinnerService} from 'ngx-spinner';
import {Breadcrumb} from '../../interfaces/breadcrumb';

import {WishlistSchema} from '../../interfaces/wishlist';

import {User} from '../../interfaces/user';
import {Pagination} from '../../interfaces/pagination';
import {PricePipe} from '../../shared/pipes/price.pipe';
import {Subscription} from 'rxjs';
import {MatRadioChange} from '@angular/material/radio';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [PricePipe]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  // Subscription
  subRoute ?: Subscription;
  subDataOne ?: Subscription;
  subDataTwo ?: Subscription;
  subDataThree ?: Subscription;
  subDataFour ?: Subscription;
  subDataFive ?: Subscription;
  subDataSix ?: Subscription;

  // All Product
  productSlug !: string | any;
  product ?: Product;

  // Image Zoom & View Area
  @ViewChild('zoomViewer', {static: true}) zoomViewer: any;
  image: any;
  zoomImage: any;

  // Quantity
  selectedQty = 1;

  // CARTS
  carts: Cart[] = [];
  existsInCart = false;

  // Image Loader
  isImgLoaded = false;
  isSmImgLoad = false;

  // View Container
  viewContainer = 'desc';
  viewPolicy = 'delivery';

  // Breadcrumb
  breadcrumbs: Breadcrumb[] = [];

  // Unit Type
  productPriceData: PriceData[] = [];
  selectedPriceData ?: PriceData | undefined;

  // User
  user ?: User | undefined;


  constructor(
    private productService: ProductService,
    // private userDataService: UserDataService,
    private userService: UserService,
    // private reloadService: ReloadService,
    private activatedRoute: ActivatedRoute,
    public uiService: UiService,
    private cartService: CartService,
    private spinner: NgxSpinnerService,
    public router: Router,
    public pricePipe: PricePipe,
  ) { }

  ngOnInit(): void {
    
    this.subRoute = this.activatedRoute.paramMap.subscribe(param => {
      this.productSlug = param.get('slug');
      this.getSingleProductBySlug();
    });

    // this.reloadService.refreshCart$.subscribe(() => {
    //   this.getCartsItems();
    // });
  }

  
  /**
   * HTTP REQ HANDLE
   */

   private getSingleProductBySlug() {
    this.spinner.show();
    this.subDataOne = this.productService.getSingleProductBySlug(this.productSlug)
      .subscribe(res => {
        this.spinner.hide();
        this.product = res.data;
        console.log(this.product);
        // this.productPriceData = this.product.prices;

        // Recommended Product

        if (this.product) {
          // if (this.productPriceData && this.productPriceData.length) {
          //   this.selectedPriceData = this.productPriceData[0];
          // }
          // this.updateBreadcrumb();
          this.setDefaultImage();
          // this.getCartsItems();
          
          // if (this.ifLoggedIn()) {
          //   this.getLoggedInUserInfo();
          // }
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }
  /**
   * IMAGE ZOOM & VIEW AREA
   */
   public onMouseMove(e: { currentTarget: any; offsetX: any; offsetY: any; }) {
    if (window.innerWidth >= 1099) {
      const image = e.currentTarget;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      const x = offsetX / image.offsetWidth * 100;
      const y = offsetY / image.offsetHeight * 100;
      const zoom = this.zoomViewer.nativeElement.children[0];
      if (zoom) {
        zoom.style.backgroundPosition = x + '% ' + y + '%';
        zoom.style.display = 'block';
        zoom.style.height = image.height + 'px';
        zoom.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event: any) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

  public selectImage(image: any) {
    this.image = image;
    this.zoomImage = image;
  }

  private setDefaultImage() {
    this.image = this.product?.images !== null ? this.product?.images[0].big : '/assets/images/junk/Nokia 3310.jpg';
    this.image = this.product?.images && this.product.images.length > 0 ? this.product.images[0] : '/assets/images/placeholder/test.png';
    this.zoomImage = this.product?.images[0].big;
    this.zoomImage = this.image;
  }

    /**
   * QUANTITY CONTROL
   */

     incrementQty() {
      this.selectedQty += 1;
    }
  
    decrementQty() {
      if (this.selectedQty === 1) {
        this.uiService.warn('Minimum Quantity is selected');
        return;
      }
      this.selectedQty -= 1;
    }

      /**
   * Breadcrumb CUSTOM
   */
  // private updateBreadcrumb() {
  //   this.breadcrumbs = [
  //     {
  //       label: 'Home',
  //       url: '/',
  //       icon: 'fas fa-home'
  //     },
  //     {
  //       label: this.product?.categorySlug,
  //       url: `/product-list/${this.product.categorySlug}`
  //     },
  //     {
  //       label: this.product?.productName,
  //       url: `/${this.product.categorySlug}`
  //     }
  //   ];
  // }
  
  ngOnDestroy() {
    if (this.subRoute) {
      this.subRoute.unsubscribe();
    }
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
    }
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }
  }
}
