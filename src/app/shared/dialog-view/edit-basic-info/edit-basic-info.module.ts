import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBasicInfoComponent } from './edit-basic-info.component';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {DigitOnlyModule} from '@uiowa/digit-only';



@NgModule({
  declarations: [
    EditBasicInfoComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        // DigitOnlyModule
    ],
  exports: [
    EditBasicInfoComponent
  ]
})
export class EditBasicInfoModule { }
