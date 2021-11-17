import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Cart} from '../../../interfaces/cart';
import {CartService} from '../../../services/cart.service';
import {DATABASE_KEY} from '../../../core/utils/global-variable';
// import {ReloadService} from '../../../services/reload.service';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-cart-view-dialog',
  templateUrl: './cart-view-dialog.component.html',
  styleUrls: ['./cart-view-dialog.component.scss']
})
export class CartViewDialogComponent implements OnInit {

  carts: Cart[] = [];

  constructor(
    public dialogRef: MatDialogRef<CartViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
    // private reloadService: ReloadService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.carts = this.data;
    }
  }

}
