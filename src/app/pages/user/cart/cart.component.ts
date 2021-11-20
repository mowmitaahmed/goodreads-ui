import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cart} from '../../../interfaces/cart';
import {UserDataService} from '../../../services/user-data.service';
import {ReloadService} from '../../../services/reload.service';
import {UserService} from '../../../services/user.service';
import {UiService} from '../../../services/ui.service';
import {DATABASE_KEY} from '../../../core/utils/global-variable';
import {CartService} from '../../../services/cart.service';
import {ProductService} from '../../../services/product.service';
import {StorageService} from '../../../services/storage.service';
import {CartPricePipe} from '../../../shared/pipes/cart-price.pipe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CartPricePipe]
})
export class CartComponent implements OnInit {

  carts: Cart[] = [];

  // Coupon
  couponText: string;
  finalDiscount = 0;

  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private reloadService: ReloadService,
    private userService: UserService,
    private uiService: UiService,
    private cartService: CartService,
    private productService: ProductService,
    private storageService: StorageService,
    private cartPricePipe: CartPricePipe,
  ) { }

  ngOnInit(): void {
    this.reloadService.refreshCart$.subscribe(() => {
      this.getCartsItems();
    });
    // this.getCartsItems();
    if (this.userService.getUserStatus()) {
      this.cartService.getCartItemList()
      .subscribe(res => {
        this.carts = res.data;
        let cartsItem = this.carts;
      const items = this.cartService.getCartItemFromLocalStorage();
      let cartIt;
      const data = cartsItem.filter(x =>{ 
        items.filter(y =>{

          if(y.product !== x.product._id){
            cartIt = y;
          }
        });
      }
        );
        console.log('cartIt',cartIt);
        if(cartIt){
          this.addItemToCartDB(cartIt);
          this.cartService.deleteAllCartFromLocal();
        }
      }, error => {
        console.log(error);
      });
      // console.log('Local Cart for user: ', items);


    }
  }

  /**
   * APPLY COUPON
   */

  /**
   * HTTP REQ HANDLE
   */
  
   addItemToCartDB(data: Cart) {
    this.userDataService.addItemToUserCart(data)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshCart$();
      }, error => {
        console.log(error);
      });
  }
    /**
   * CART DATA
   */
  private getCartsItems() {
    if (this.userService.getUserStatus()) {
      this.getCartItemList();
      this.getCarsItemFromLocal();
      // console.log('Carts:', this.carts);
    } else {
      this.getCarsItemFromLocal();
    }
  }

  private getCarsItemFromLocal() {
    const items = this.cartService.getCartItemFromLocalStorage();
    if (items && items.length > 0) {
      const ids: string[] = items.map(m => m.product as string);
      this.productService.getSpecificProductsById(ids, 'productName productSlug price prices discountType discountAmount  quantity images')
        .subscribe(res => {
          const products = res.data;
          window.scrollTo(0, 0);
          if (products && products.length > 0) {
            this.carts = items.map(t1 => ({...t1, ...{product: products.find(t2 => t2._id === t1.product)}}));
          }
        });
    } else {
      this.carts = [];
    }
  }


  /**
   * CART FUNCTIONALITY
   */
  onDeleteCartItem(cartId: string, product: string) {
    if (this.userService.getUserStatus()) {
      this.removeCartItem(cartId);
    } else {
      this.cartService.deleteCartItemFromLocalStorage(product);
      this.reloadService.needRefreshCart$();
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
    // return this.carts.map(t => {

    //   console.log(t.product.price - t.product.discountAmount);
    //   return t.product.price - t.product.discountAmount;
    //   // return this.cartPricePipe.transform(t, 'priceWithDiscount') as number;
    // }).reduce((acc, value) => acc + value, 0);
    return this.carts.reduce((acc, item)=> {
      return acc + ((item.product.price-item.product.discountAmount) * item.selectedQty);
  }, 0);

  }

  
  get totalSave(): number {
    // const old = this.cartsItems.map(t => t.product.price * t.selectedQty).reduce((acc, value) => acc + value, 0);
    // return old - this.totalAmount;
    return 0;
  }


  /**
   * HTTP REQ HANDLE
   */
  private getCartItemList() {
    this.cartService.getCartItemList()
      .subscribe(res => {
        this.carts = res.data;
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
}
