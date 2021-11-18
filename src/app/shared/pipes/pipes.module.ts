import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {AddressPipe} from './address.pipe';
import {PricePipe} from './price.pipe';
// import {SafeHtmlCustomPipe} from './safe-html.pipe';
// import {SortPipe} from './sort.pipe';
// import {RoleModifyPipe} from './role-modify.pipe';
// import {NumberMinDigitPipe} from './number-min-digit.pipe';
// import {SlugToNormalPipe} from './slug-to-normal.pipe';
// import {OrderStatusPipe} from './order-status.pipe';
// import {ArrayStringPipe} from './array-string.pipe';
// import {DiscountPipe} from './discount.pipe';
// import {TextWrapPipe} from './text-wrap.pipe';
// import {HideDealOfDayPipe} from './hide-deal-of-day.pipe';
// import {EmiStatusPipe} from './emi-status.pipe';
// import {FormatBytesPipe} from './format-bytes.pipe';
// import {FeaturedStatusPipe} from './featured-status.pipe';
// import {PriceDataPipe} from './price-data.pipe';
import {CartPricePipe} from './cart-price.pipe';
// import {CartUnitTypePipe} from './cart-unit-type.pipe';
// import {OrderTypePipe} from './order-type.pipe';


@NgModule({
  declarations: [
    // AddressPipe,
    PricePipe,
    // PriceDataPipe,
    CartPricePipe,
    // CartUnitTypePipe,
    // SafeHtmlCustomPipe,
    // SortPipe,
    // RoleModifyPipe,
    // NumberMinDigitPipe,
    // SlugToNormalPipe,
    // OrderStatusPipe,
    // ArrayStringPipe,
    // DiscountPipe,
    // TextWrapPipe,
    // HideDealOfDayPipe,
    // EmiStatusPipe,
    // FormatBytesPipe,
    // FeaturedStatusPipe,
    // OrderTypePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // AddressPipe,
    PricePipe,
    // PriceDataPipe,
    CartPricePipe,
    // CartUnitTypePipe,
    // SafeHtmlCustomPipe,
    // SortPipe,
    // RoleModifyPipe,
    // NumberMinDigitPipe,
    // SlugToNormalPipe,
    // OrderStatusPipe,
    // DiscountPipe,
    // TextWrapPipe,
    // HideDealOfDayPipe,
    // EmiStatusPipe,
    // FormatBytesPipe,
    // FeaturedStatusPipe,
    // OrderTypePipe
  ]
})
export class PipesModule {
}
