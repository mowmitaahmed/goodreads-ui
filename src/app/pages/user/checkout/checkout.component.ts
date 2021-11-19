import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserDataService} from '../../../services/user-data.service';
import {ReloadService} from '../../../services/reload.service';
import {Cart} from '../../../interfaces/cart';
import {UiService} from '../../../services/ui.service';
import {CartService} from '../../../services/cart.service';
import {Product} from '../../../interfaces/product';
import {Order, OrderItem} from '../../../interfaces/order';
import {UtilsService} from '../../../services/utils.service';

import {ConfirmOrderDialogComponent} from './confirm-order-dialog/confirm-order-dialog.component';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {environment} from '../../../../environments/environment';
import {User} from '../../../interfaces/user';

import {StorageService} from '../../../services/storage.service';

import {CartPricePipe} from '../../../shared/pipes/cart-price.pipe';

import {UserService} from '../../../services/user.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DATABASE_KEY} from '../../../core/utils/global-variable';

import {OrderStatus} from '../../../enum/order-status';
import {MatSelectChange} from '@angular/material/select';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [CartPricePipe]
})
export class CheckoutComponent implements OnInit {

  // Form Template Ref
  @ViewChild('templateForm') templateForm: NgForm;

  dataForm?: FormGroup;
  private sub: Subscription;


  // DATA
  carts: Cart[] = [];
  user: User = null;

  // Final Shipping Charge
  shippingCharge = 0;
  finalDiscount = 0;

  // Store Order Data
  order: Order = null;

  // PAYMENT DATA
  currency = 'BDT';
  shippingMethod: 'Courier';
  shippingType = 'Courier';
  productsNameStr: string = null;
  productsCatStr: string = null;

  // PAYMENT TYPES
  paymentTypes: any[] = [
    {value: 'cash_on_delivery', viewValue: 'Cash on Delivery', image: '/assets/images/payments/money.png'},
    {value: 'online_payment', viewValue: 'Online Payment or Bkash, Nagad or Rocket', image: '/assets/images/payments/credit.png'}
  ];


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userDataService: UserDataService,
    private reloadService: ReloadService,
    private uiService: UiService,
    private cartService: CartService,
    private cartPricePipe: CartPricePipe,
    // private cartUnitTypePipe: CartUnitTypePipe,
    private utilsService: UtilsService,
    // private orderService: OrderService,
    private storageService: StorageService,
    // private couponService: CouponService,
    // private paymentSslService: PaymentSslService,
    // private shippingService: ShippingChargeService,
    private router: Router,
    private userService: UserService,
    // private bulkSmsService: BulkSmsService,
    // private districtService: DistrictService,
    // private areaService: AreaService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {

    this.reloadService.refreshCart$.subscribe(() => {
      this.getCartsItems();
    });

    this.getLoggedInUserInfo();
    this.getCartsItems();
    // this.getShippingCharge();
    // this.getAllDistricts();

    // this.couponData = this.storageService.storedCouponData;
    // if (this.couponData) {
    //   this.couponText = this.couponData.couponCode;
    //   this.getCouponCalculation();
    // }

    // Order Form
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      phoneNo: [null, Validators.required],
      email: [null, Validators.email],
      shippingAddress: [null, Validators.required],
      orderType: ['cash_on_delivery'],
      orderNotes: [null],
    });
  }

  /**
   * APPLY COUPON
   */


  /**
   * HTTP REQ HANDLE
   */

  // private getShippingCharge() {
  //   const select = 'deliveryInDhaka deliveryOutsideDhaka -_id';
  //   this.shippingService.getShippingCharge(select)
  //     .subscribe(res => {
  //       this.shippingChargeData = res.data;
  //       this.getFinalShippingCharge();
  //     }, error => {
  //       console.log(error);
  //     });
  // }


  /**
   * SHIPPING CHARGED BASED ON LOCATION
   */



  /**
   * CART DATA
   */
  private getCartsItems() {
    this.cartService.getCartItemList()
      .subscribe(res => {
        this.carts = res.data;
        if (this.carts && this.carts.length > 0) {
          const productNames = this.carts.map(m => {
            const product = m.product as Product;
            return product.productName;
          });
          const productCategories = this.carts.map(m => {
            const product = m.product as Product;
            return product.categorySlug;
          });
          this.productsNameStr = productNames.join();
          this.productsCatStr = productCategories.join();
        } else {
          this.router.navigate(['/']);
        }

      }, error => {
        console.log(error);
      });
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
    return this.carts.reduce((acc, item)=> {
      return acc + ((item.product.price-item.product.discountAmount) * item.selectedQty);
  }, 0);
  }


  /**
   * HTTP REQ HANDLE
   */

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


  /**
   * COMPONENT DIALOG VIEW
   */

  openConfirmOrderDialog() {
    const dialogRef = this.dialog.open(ConfirmOrderDialogComponent, {
      data: {
        order: this.order,
        carts: this.carts,
        selectedPaymentType: this.dataForm.value.orderType
      },
      panelClass: ['theme-dialog'],
      width: '90%',
      maxWidth: '1050px',
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.isConfirm) {
          if (this.dataForm.value.orderType === 'cash_on_delivery') {
            // this.saveOrderInformationToMain();
          } else if (this.order.totalAmountWithDiscount < 10) {
            this.order.paymentMethod = 'cash_on_delivery';
            if (this.order.totalAmountWithDiscount === 0) {
              this.order.paymentStatus = 'paid';
            }
            // this.saveOrderInformationToMain();
          } else {
            // this.saveOrderInformationToTemp();
          }
        }
      }
    });
  }


  /**
   * HTTP REQ HANDLE
   * LOCAL STORAGE HANDLE
   */

  private getLoggedInUserInfo() {
    const select = '-password';
    this.userDataService.getLoggedInUserInfo(select)
      .subscribe(res => {
        this.user = res.data;
        if (this.user) {
          this.dataForm.patchValue(
            {...this.user, ...{name: this.user.fullName}}
          );
        }
        console.log(this.user);
      }, error => {
        console.log(error);
      });
  }


  /**
   * MAIN PLACE ORDER
   */
  placeOrder() {

    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required field');
      return;
    }

    console.log(this.dataForm.value);
    const products = this.carts.map(m => {
      const product = m.product as Product;
      return {
        product: product._id,
        price: product.price,
        discountType: product.discountType,
        discountAmount: product.discountAmount,
        quantity: m.selectedQty,
        // unitType: this.cartUnitTypePipe.transform(m),
        orderType: 'regular',
      } as OrderItem;
    });

    this.order = {
      paymentMethod: this.dataForm.value.orderType,
      checkoutDate: new Date(),
      name: this.dataForm.value.name,
      phoneNo: this.dataForm.value.phoneNo,
      email: this.dataForm.value.email ? this.dataForm.value.email : 'N/A',
      alternativePhoneNo: null,
      area: this.dataForm.value.area,
      district: this.dataForm.value.district,
      shippingAddress: this.dataForm.value.shippingAddress,
      deliveryDate: null,
      deliveryStatus: OrderStatus.PENDING,
      shippingFee: this.shippingCharge,
      subTotal: this.cartSubTotal,
      discount: this.finalDiscount,
      totalAmount: this.cartSubTotal + this.shippingCharge,
      totalAmountWithDiscount: this.finalDiscount > (this.cartSubTotal + this.shippingCharge) ? 0 : (this.cartSubTotal + this.shippingCharge - this.finalDiscount),
      deletedProduct: false,
      refundAmount: 0,
      paymentStatus: 'unpaid',
      hasPreorderItem: false,
      orderTimeline: {
        others: false,
        othersData: null,
        orderPlaced: false,
        orderPlacedDate: new Date(),
        orderProcessing: false,
        orderProcessingDate: null,
        orderPickedByDeliveryMan: false,
        orderPickedByDeliveryManDate: null,
        orderDelivered: false,
        orderDeliveredDate: null
      },
      // couponId: this.couponData?._id,
      couponValue: null,
      orderedItems: products,
      orderNotes: this.dataForm.value.orderNotes,
      orderType: '0',
      sessionkey: null
    };


    console.log(this.order);

    this.openConfirmOrderDialog();

  }

  /**
   * BULK SMS
   */


}
