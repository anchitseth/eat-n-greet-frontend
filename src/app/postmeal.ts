import {Postmmealaddress} from './postmmealaddress';
import {Postmealitemlist} from './postmealitemlist';
export interface Postmeal {
producerOrderId: number;
firstName: string;
lastName: string;
servingDate: string;
paymentDeadline: string;
reservationDeadline: string;
price: number;
maxPeopleCount: number;
actualPeopleCount: 2;
preferenceType: string;
otherItems: string;
note: string;
uri: string[];
address: Postmmealaddress[];
itemlist: Postmealitemlist[];
}
