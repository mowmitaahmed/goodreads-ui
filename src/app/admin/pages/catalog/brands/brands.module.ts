import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './brands.component';
import {MaterialModule} from '../../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AddNewBrandComponent} from './add-new-brand/add-new-brand.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
// import {DigitOnlyModule} from '@uiowa/digit-only';
import {PipesModule} from '../../../../shared/pipes/pipes.module';


@NgModule({
  declarations: [
    BrandsComponent,
    AddNewBrandComponent
  ],
    imports: [
        CommonModule,
        BrandsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexModule,
        FormsModule,
        MatProgressSpinnerModule,
        NgxSpinnerModule,
        FlexLayoutModule,
        NgxPaginationModule,
        // DigitOnlyModule,
        PipesModule,
    ]
})
export class BrandsModule { }
