import {IShoppingList} from "../../models/shoppingList.model";
import BASE_URL from "../../utils/urlResolver.util";

export async function pullShoppingLists(): Promise<IShoppingList[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch shopping lists');
    return res.json();
}

export async function createShoppingList(data: Partial<IShoppingList>): Promise<IShoppingList> {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create shopping list');
    return res.json();
}

export async function deleteShoppingList(_id: string): Promise<boolean> {
    const res = await fetch(BASE_URL + _id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to create shopping list');
    return true;
}

export async function updateShoppingList(newShoppingList: Partial<IShoppingList>): Promise<boolean> {
    const res = await fetch(BASE_URL + newShoppingList._id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShoppingList.name),
    });
    if (!res.ok) throw new Error('Failed to update shopping list');
    return true
}


