import {IShoppingList} from "../../models/shoppingList.model";
import BASE_URL from "../../utils/urlResolver.util";

//Shopping list
export async function pullShoppingLists(): Promise<IShoppingList[]> {
    return safeFetch(BASE_URL);
}

export async function createShoppingList(data: Partial<IShoppingList>): Promise<void> {
    await safeFetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

export async function deleteShoppingList(_id: string): Promise<void> {
    await safeFetch(BASE_URL + _id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function editShoppingListName(newShoppingList: Partial<IShoppingList>): Promise<void> {
    await safeFetch(BASE_URL + newShoppingList._id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: newShoppingList.name}),
    });
}

export async function getShoppingListByID(_id: string): Promise<IShoppingList> {
    return safeFetch(BASE_URL + _id);
}

//Items
export async function addNewItemToShoppingList(_id: string, newShoppingItem: string): Promise<void> {
    await safeFetch(BASE_URL + _id + '/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: { name: newShoppingItem } })
    });
}

export async function deleteItemFromShoppingList(_id: string, _item_id: string): Promise<void> {
    await safeFetch(BASE_URL + _id + '/items/' + _item_id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function editItemInShoppingList(listId: string, itemId: string, newName: string): Promise<void> {
    await safeFetch(BASE_URL + listId + '/items/' + itemId, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
    });
}

export async function safeFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const response = await fetch(input, init);

    const isJSON = response.headers.get('content-type')?.includes('application/json');
    if (!response.ok) {
        let message = 'Unexpected error';
        if (isJSON) {
            try {
                const body = await response.json();
                message = body?.error || body?.message || message;
            } catch {}
        }
        throw new Error(message);
    }

    if (!isJSON) return undefined as T;
    return response.json();
}
