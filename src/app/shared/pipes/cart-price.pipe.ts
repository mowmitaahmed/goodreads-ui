import {Pipe, PipeTransform} from '@angular/core';
import {DiscountTypeEnum} from '../../enum/discount-type.enum';
import {Product} from '../../interfaces/product';
import {Cart} from '../../interfaces/cart';
import {UtilsService} from '../../services/utils.service';

@Pipe({
  name: 'cartPrice'
})
export class CartPricePipe implements PipeTransform {

  constructor(private utilsService: UtilsService) {
  }

  transform(cart: Cart, type: string, unit?: boolean): number {
    const product = cart.product as Product;
    const price = product.prices.find((f: { _id: string | undefined; }) => f._id === cart.priceId);
    const quantity = unit ? 1 : cart.selectedQty;

    if (price) {
      switch (type) {
        case 'priceWithDiscount': {
          if (price.discountType === DiscountTypeEnum.PERCENTAGE) {
            const disPrice = (price.discountAmount / 100) * price?.price;
            if (quantity) {
              return this.utilsService.toFixedNumber(((price?.price - disPrice) * quantity), 2);
            }
            return this.utilsService.toFixedNumber((price?.price - disPrice), 2);
          } else if (price.discountType === DiscountTypeEnum.CASH) {
            if (quantity) {
              return this.utilsService.toFixedNumber(((price?.price - price.discountAmount) * quantity), 2);
            }
            return this.utilsService.toFixedNumber((price?.price - price.discountAmount), 2);
          } else {
            if (quantity) {
              return this.utilsService.toFixedNumber(((price?.price) * quantity), 2);
            }
            return this.utilsService.toFixedNumber((price?.price), 2);
          }
        }
        case 'discountPrice': {
          if (price.discountType === DiscountTypeEnum.PERCENTAGE) {
            if (quantity) {
              return this.utilsService.toFixedNumber(((price?.discountAmount / 100) * price?.price) * quantity, 2);
            }
            return this.utilsService.toFixedNumber((price?.discountAmount / 100) * price?.price, 2);
          } else if (price.discountType === DiscountTypeEnum.CASH) {
            if (quantity) {
              return this.utilsService.toFixedNumber(price?.discountAmount * quantity, 2);
            }
            return this.utilsService.toFixedNumber(price?.discountAmount, 2);
          } else {
            return 0;
          }
        }
        case 'discountPercentage': {
          if (price.discountType === DiscountTypeEnum.PERCENTAGE) {
            if (quantity) {
              return price?.discountAmount;
            }
            return price?.discountAmount;
          } else if (price.discountType === DiscountTypeEnum.CASH) {
            if (quantity) {
              return Math.round((price?.discountAmount / price?.price) * 100);
            }
            return Math.round((price?.discountAmount / price?.price) * 100);
          } else {
            return 0;
          }
        }
        case 'normalPrice': {
          if (quantity) {
            return this.utilsService.toFixedNumber(((price?.price) * quantity), 2);
          }
          return this.utilsService.toFixedNumber((price?.price), 2);
        }
        default: {
          return price?.price;
        }
      }
    } else {
      return 0;
    }

  }

}
