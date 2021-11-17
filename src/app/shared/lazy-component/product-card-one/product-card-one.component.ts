import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

// import {QuickViewDialogComponent} from './quick-view-dialog/quick-view-dialog.component';
// import {ReloadService} from '../../../services/reload.service';
import {Cart} from '../../../interfaces/cart';
import {UserService} from '../../../services/user.service';
import {CartService} from '../../../services/cart.service';
import {UiService} from '../../../services/ui.service';
import {Product} from '../../../interfaces/product';
import {WishlistSchema} from '../../../interfaces/wishlist';
// import {UserDataService} from '../../../services/user-data.service';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-product-card-one',
  templateUrl: './product-card-one.component.html',
  styleUrls: ['./product-card-one.component.scss']
})


export class ProductCardOneComponent implements OnInit {

  @Input() data: any = null;
  @Input() product?: Product;
  dataOb: any;
  productId = null;
  
  constructor(
    private router: Router,
    // public dialog: MatDialog,
    private userService: UserService,
    private cartService: CartService,
    // private reloadService: ReloadService,
    private uiService: UiService,
    // private userDataService: UserDataService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {

  }

}
