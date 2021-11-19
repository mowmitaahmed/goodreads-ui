import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../interfaces/product';

import {Pagination} from '../../../interfaces/pagination';

import {User} from '../../../interfaces/user';
import {UserService} from '../../../services/user.service';
import {UserDataService} from '../../../services/user-data.service';
import {CartPricePipe} from '../../../shared/pipes/cart-price.pipe';
import {CartService} from '../../../services/cart.service';
import {ReloadService} from '../../../services/reload.service';
import {Cart} from '../../../interfaces/cart';
import {DATABASE_KEY} from '../../utils/global-variable';
import {UiService} from '../../../services/ui.service';
import {CategoryService} from '../../../services/category.service';
import {ProductCategory} from '../../../interfaces/product-category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [CartPricePipe]
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  // navItems: NavItems[];
  navItems: ProductCategory[] = [];

  @Output() sidenavNavToggle = new EventEmitter();

  @Input() scrollPosition = 0;

  // User Data
  user !: User;
  isUserAuth = false;

  // CARTS
  cartSlide = false;
  carts !: Cart[] | any;
  cartsItemsCount = 0;
  timeOutOngoing: any;

  // SEARCH AREA
  overlay = false;
  isOpen = false;
  isFocused = false;
  isLoading = false;
  isSelect = false;
  query = null;

  constructor(
    private productService: ProductService,
    public router: Router,
    private categoryService: CategoryService,
    // private promoPageService: PromoPageService,
    public userService: UserService,
    public userDataService: UserDataService,
    private cartService: CartService,
    private reloadService: ReloadService,
    private cartPricePipe: CartPricePipe,
    private uiService: UiService,
    // providers: [CartPricePipe]
  ) { }

  ngOnInit(): void {
    this.reloadService.refreshCategories$
      .subscribe(() => {
        this.getAllCategory();
      });

    this.userService.getUserStatusListener().subscribe(() => {
      this.isUserAuth = this.userService.getUserStatus();
      if (this.isUserAuth) {
        this.getLoggedInUserInfo();
      }
    });
    this.isUserAuth = this.userService.getUserStatus();
    if (this.isUserAuth) {
      this.getLoggedInUserInfo();
    }

    // CART FUNCTION
    this.reloadService.refreshCart$.subscribe(() => {
      this.getCartsItems(true);
    });
    this.getCartsItems();
    this.getAllCategory();
    // this.getPromoPage();
  }

  ngAfterViewInit(): void {}

    /**
   * HTTP REQ HANDLE
   */
     private getAllCategory() {

      this.categoryService.getAllCategory()
        .subscribe(res => {
          this.navItems = res.data;
          console.log('Nav Iitems', this.navItems);
        }, error => {
          console.log(error);
        });
    }
     private getLoggedInUserInfo() {
      const select = 'fullName';
      this.userDataService.getLoggedInUserInfo(select)
        .subscribe(res => {
          this.user = res.data;
        }, error => {
          console.log(error);
        });
    }
    

  onDeleteCartItem(cartId: string, product: string) {
    if (this.userService.getUserStatus()) {
      this.removeCartItem(cartId);
    } else {
      this.cartService.deleteCartItemFromLocalStorage(product);
      this.reloadService.needRefreshCart$();
    }
  }

  private incrementCartQtyDB(cartId: string) {
    this.cartService.incrementCartQuantity(cartId)
      .subscribe(() => {
        this.reloadService.needRefreshCart$();
      }, error => {
        console.log(error);
      });
  }

  private decrementCartQtyDB(cartId: string) {
    this.cartService.decrementCartQuantity(cartId)
      .subscribe(() => {
        this.reloadService.needRefreshCart$();
      }, error => {
        console.log(error);
      });
  }

  private removeCartItem(cartId: string) {
    this.cartService.removeCartItem(cartId)
      .subscribe(() => {
        this.reloadService.needRefreshCart$();
      }, error => {
        console.log(error);
      });
  }

  /**
   * CART DATA
   */
  private getCartsItems(refresh?: boolean) {
    if (this.userService.getUserStatus()) {
      this.cartService.getCartItemList()
        .subscribe(res => {
          this.carts = res.data;
          if (refresh) {
            // console.log('Iam on Cart trigger');
            this.cartSlide = true;
            console.log(this.cartSlide);
          }
        });
    } else {
      // this.getCarsItemFromLocal();
      this.getCarsItemFromLocal(refresh);
    }

  }

  private getCarsItemFromLocal(refresh?: boolean) {
    const items = this.cartService.getCartItemFromLocalStorage();
    if (items && items.length > 0) {
      const ids: string[] = items.map(m => m.product as string);
      console.log('Sync Item', ids);
      this.productService.getSpecificProductsById(ids, 'productName productSlug price prices discountType discountAmount  quantity images')
        .subscribe(res => {
          const products = res.data;
          if (products && products.length > 0) {
            this.carts = items.map(t1 => ({...t1, ...{product: products.find(t2 => t2._id === t1.product)}}));
            console.log('Header cart', this.carts);
            if (refresh) {
              console.log('Iam on Cart trigger Local');
              this.cartSlide = true;
              console.log(this.cartSlide);
            }
          }
        });
    } else {
      this.carts = [];
    }
  }

  /**
   * LOGICAL METHODS
   */

  incrementQty(cartId: string, index: number) {
    if (this.userService.getUserStatus()) {
      this.incrementCartQtyDB(cartId);
    } else {
      const data = this.cartService.getCartItemFromLocalStorage();
      if (data != null) {
        data[index].selectedQty = data[index].selectedQty + 1;
        localStorage.setItem(DATABASE_KEY.userCart, JSON.stringify(data));
        this.reloadService.needRefreshCart$();
      }
    }
  }

  decrementQty(cartId: string, index: number, sQty: number) {
    if (this.userService.getUserStatus()) {
      if (sQty === 1) {
        this.uiService.warn('Minimum quantity is 1');
        return;
      }
      this.decrementCartQtyDB(cartId);
    } else {
      const data = this.cartService.getCartItemFromLocalStorage();
      if (data[index].selectedQty === 1) {
        return;
      }
      if (data != null) {
        data[index].selectedQty = data[index].selectedQty - 1;
        localStorage.setItem(DATABASE_KEY.userCart, JSON.stringify(data));
        this.reloadService.needRefreshCart$();
      }
    }

  }

  /**
   * CALCULATION
   */

  get cartSubTotal(): number {
    if (this.carts && this.carts.length > 0) {
      return this.carts.map((t: any) => {
        return this.cartPricePipe.transform(t, 'priceWithDiscount') as number;
      }).reduce((acc: any, value: any) => acc + value, 0);
    } else {
      return 0;
    }
  }



/**
   * HANDLE SEARCH
   * OVERLAY
   * SELECT
   */


 onClickHeader(): void {
  this.handleCloseOnly();
}

onClickSearchArea(event: MouseEvent): void {
  event.stopPropagation();
}


handleOverlay(): void {
  this.overlay = false;
  this.isOpen = false;
  this.isFocused = false;
}

handleFocus(event: FocusEvent): void {

  if (this.isFocused) {
    return;
  }
  this.isFocused = true;
}


private setPanelState(event: FocusEvent): void {
  if (event) {
    event.stopPropagation();
  }
  this.isOpen = false;
  this.handleOpen();
}


handleOpen(): void {
  if (this.isOpen || this.isOpen && !this.isLoading) {
    return;
  }
}

handleOutsideClick(): void {
  if (!this.isOpen) {
    // this.isFocused = false;
    return;
  }
  this.isOpen = false;
  this.overlay = false;
  this.isFocused = false;
}

handleCloseOnly(): void {
  if (!this.isOpen) {
    this.isFocused = false;
    return;
  }
  this.isOpen = false;
  this.overlay = false;
  this.isFocused = false;
}

handleCloseAndClear(): void {
  if (!this.isOpen) {
    this.isFocused = false;
    return;
  }
  this.isOpen = false;
  this.overlay = false;
  this.isFocused = false;
}


onSelectItem(data: Product): void {
  this.handleCloseAndClear();
  // this.router.navigate(['/product-details', data?.productSlug]);
  this.router.navigate(['/', data?.brandSlug, data?.categorySlug, data?.productSlug]);
}
  
  
  /**
   * ON TOGGLE SIDE MENU
   */
   onToggleSidenav() {
    this.sidenavNavToggle.emit();
  }

  ngOnDestroy() {
    if (this.timeOutOngoing) {
      clearTimeout(this.timeOutOngoing);
    }
  }

  
  /**** cart-slide */
  cartSlideActive() {
    this.cartSlide = true;
    console.log('Cart');
  }

  cartSlideInactive() {
    this.cartSlide = false;
  }

}
