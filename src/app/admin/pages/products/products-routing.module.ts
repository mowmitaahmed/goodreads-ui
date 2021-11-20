import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ProductsNewComponent } from '../products-new/products-new.component';
// import {ProductsComponent} from './products.component';

const routes: Routes = [
  {path: '', component: ProductsNewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
