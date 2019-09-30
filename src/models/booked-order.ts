import { Item } from 'src/models/Item';
import { Address } from 'src/models/Address';

export interface BookedOrder {

  price: number;
  preference: number;
  itemList: Item[];
  servingDate: string;
  firstName: string;
  lastName: string;
  address: Address;
}
