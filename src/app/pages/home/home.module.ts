import { MatIconModule } from '@angular/material/icon';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material/material.module';
import {ProductCardOneModule} from '../../shared/lazy-component/product-card-one/product-card-one.module';

import {LazyLoadImageModule} from 'ng-lazyload-image';

import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    ProductCardOneModule,
    LazyLoadImageModule,
    MatIconModule,
    FormsModule,
    NgxPaginationModule,
    MatSliderModule
  ]
})
export class HomeModule { }
