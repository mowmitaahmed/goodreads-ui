import {District} from './district';

export interface Area {
  _id?: string;
  area: string;
  areabn?: string;
  coordinates?: string;
  district?: string | District;
}
