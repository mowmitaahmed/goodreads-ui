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
import {EditBasicInfoModule} from '../../../shared/dialog-view/edit-basic-info/edit-basic-info.module';
import { ImageCropComponent } from './image-crop/image-crop.component';
import {ImageCropperModule} from 'ngx-image-cropper';


@NgModule({
  declarations: [
    AccountComponent,
    BasicInfoComponent,
    OrderListComponent,
    OrderDetailsComponent,
    ImageCropComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    EditBasicInfoModule,
    ImageCropperModule
  ]
})
export class AccountModule { }
