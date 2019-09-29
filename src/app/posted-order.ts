import {Postmealitemlist} from './postmealitemlist';
import {Postmmealaddress} from './postmmealaddress';

export class PostedOrder {
    producerOrderId: number;
    firstName: string;
    lastName: string;
    itemList: Postmealitemlist[];
    address: Postmmealaddress[];
    servingDate: string;
    reservationdeadline: string;
    paymentdeadline: string;
    price: number;
    maxPeopleCount: number;
    actualPeopleCount: number;
    preferenceType: string;
    otherItems: string;
    note: string;
    imageUrls: string[];
    imageThumbnailUrls: string[];
}
