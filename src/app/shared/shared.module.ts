import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import {NgxSpinnerModule} from 'ngx-spinner';

import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';

// import {FlexLayoutServerModule} from '@angular/flex-layout/server';

import {FormsModule} from '@angular/forms';
import { SnackbarNotificationComponent } from './components/ui/snackbar-notification/snackbar-notification.component';
import { CartViewDialogComponent } from './components/cart-view-dialog/cart-view-dialog.component';
import { BottomSheetViewComponent } from './components/ui/bottom-sheet-view/bottom-sheet-view.component';
import { EditBasicInfoComponent } from './dialog-view/edit-basic-info/edit-basic-info.component';

@NgModule({
    imports: [
      CommonModule,
      FlexLayoutModule,
      // FlexLayoutServerModule,
      NgxSpinnerModule,
      MaterialModule,
      RouterModule,
      FormsModule
    ],
    exports: [
      FlexLayoutModule,
      FooterComponent
    ],
    declarations: [
    
    SnackbarNotificationComponent,
         CartViewDialogComponent,
         BottomSheetViewComponent,
         FooterComponent,
         EditBasicInfoComponent
  ],
    providers: [],
    entryComponents: []
  })


export class SharedModule {
}