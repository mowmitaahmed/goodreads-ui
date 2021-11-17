import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account.component';
import {MaterialModule} from '../../../material/material.module';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { OrderListComponent } from './order-list/order-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
  declarations: [
    AccountComponent,
    BasicInfoComponent,
    OrderListComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AccountModule { }
