import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsNewRoutingModule } from './products-new-routing.module';
import { ProductsNewComponent } from './products-new.component';
import {MaterialModule} from "../../../material/material.module";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductsNewComponent
  ],
  imports: [
    CommonModule,
    ProductsNewRoutingModule,
    MaterialModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ProductsNewModule { }