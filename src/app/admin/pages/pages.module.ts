import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesComponent} from './pages.component';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {SidenavListComponent} from './components/sidenav-list/sidenav-list.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FlexLayoutModule} from '@angular/flex-layout';

import {ProductTableComponent} from './components/product-table/product-table.component';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProductViewTableOneComponent} from './components/product-view-table-one/product-view-table-one.component';
// import { ProductsNewComponent } from './products-new/products-new.component';
// import { ImageFolderComponent } from './gallery/image-folder/image-folder.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'brands',
        loadChildren: () => import('./catalog/brands/brands.module').then(m => m.BrandsModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'categories',
        loadChildren: () => import('./catalog/categories/categories.module').then(m => m.CategoriesModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'add-product',
        loadChildren: () => import('./products/add-product/add-product.module').then(m => m.AddProductModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'image-gallery',
        loadChildren: () => import('./gallery/image-gallery/image-gallery.module').then(m => m.ImageGalleryModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'image-folder',
        loadChildren: () => import('./gallery/image-folder/image-folder.module').then(m => m.ImageFolderModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      {
        path: 'products-new',
        loadChildren: () => import('../pages/products-new/products-new.module').then(m => m.ProductsNewModule),
        // canActivate: [CheckAuthAccessGuard]
      },
      // {
      //   path: 'orders',
      //   canActivate: [CheckAuthAccessGuard, EditorAuthRoleGuard],
      //   loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      // }
    ]
  },
];

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    SidenavListComponent,
    ProductTableComponent,
    ProductViewTableOneComponent,
    // ProductsNewComponent,
    // ImageFolderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    // PipesModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [
    ProductViewTableOneComponent
  ]
})
export class PagesModule {
}
