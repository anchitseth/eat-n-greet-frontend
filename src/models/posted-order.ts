import { Item } from 'src/models/Item';

export class PostedOrder {
    itemList: Item[];
    servingDate: string;
    paymentDeadline: string;
    reservationDeadline: string;
    price: number;
    maxPeopleCount: number;
    actualPeopleCount: number;
    preference: number;
    otherItems: string;
    note: string;
}
