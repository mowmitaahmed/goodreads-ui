import {Inject, Injectable} from '@angular/core';
import * as moment from 'moment';
import {LocationData} from '../interfaces/location';
import {LOCATIONS_DATA} from '../core/utils/location';
import {DAYS, MONTHS, YEARS} from '../core/utils/birthdate';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    constructor(
      @Inject(DOCUMENT) private document: Document
    ) {
    }


  /**
   * UTILS
   */

   getDateWithCurrentTime(date: Date): Date {
    const _ = moment();
    // const newDate = moment(date).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()});
    const newDate = moment(date).add({hours: _.hour(), minutes: _.minute()});
    return newDate.toDate();
  }

  public toFixedNumber( value: number, dp: number ){
    return +parseFloat(String(value)).toFixed( dp );
  }

    /**
   * GET RANDOM NUMBER
   */
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
     getImageName(originalName: string): string {
      const array = originalName.split('.');
      array.pop();
      return array.join('');
    }

}