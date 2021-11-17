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

}