import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {MenuModule} from '../core/menu/menu.module';
// import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MenuModule,
    // NgxPaginationModule
  ]
})
export class PagesModule {
}
