import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "../products/products.component";
import {ProductsNewComponent} from "./products-new.component";

const routes: Routes = [
  {path: '', component: ProductsNewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsNewRoutingModule { }