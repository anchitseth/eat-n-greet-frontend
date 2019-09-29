import {Postmealitemlist} from './postmealitemlist';
import {Postmmealaddress} from './postmmealaddress';

export interface BookedOrder {
    BookingId: number;
  firstName: string;
  lastName: string;
  itemList: Postmealitemlist[];
  address: Postmmealaddress[];
}
