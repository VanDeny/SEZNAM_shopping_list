import { IShoppingItem } from './shoppingItem.model';

export interface IShoppingList{
    _id: string,
    name: string,
    items: IShoppingItem[];
}