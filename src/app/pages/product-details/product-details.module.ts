import { SwiperModule } from 'swiper/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductDetailsRoutingModule} from './product-details-routing.module';
import {ProductDetailsComponent} from './product-details.component';
import {MaterialModule} from '../../material/material.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductCardOneModule} from '../../shared/lazy-component/product-card-one/product-card-one.module';



@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProductCardOneModule,
    SwiperModule
]
})
export class ProductDetailsModule { }
