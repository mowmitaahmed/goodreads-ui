import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProductCardOneComponent} from './product-card-one.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';


import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxSpinnerModule} from 'ngx-spinner';

import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
  declarations: [
    ProductCardOneComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    LazyLoadImageModule
  ],
  // providers: [{provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks}],
  exports: [
    ProductCardOneComponent
  ],
})
export class ProductCardOneModule { }
