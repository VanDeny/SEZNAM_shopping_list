import {IShoppingList} from "../../models/shoppingList.model";
import BASE_URL from "../../utils/urlResolver.util";

//Shopping list
export async function pullShoppingLists(): Promise<IShoppingList[]> {
    return safeFetch(BASE_URL);
}

export async function createShoppingList(data: Partial<IShoppingList>): Promise<boolean> {
    await safeFetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return true;
}

export async function deleteShoppingList(_id: string): Promise<boolean> {
    await safeFetch(BASE_URL + _id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return true;
}

export async function editShoppingListName(newShoppingList: Partial<IShoppingList>): Promise<boolean> {
    await safeFetch(BASE_URL + newShoppingList._id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: newShoppingList.name}),
    });
    return true
}

export async function getShoppingListByID(_id: string): Promise<IShoppingList> {
    return safeFetch(BASE_URL + _id);
}

//Items
export async function addNewItemToShoppingList(_id: string, newShoppingItem: string): Promise<boolean> {
    await safeFetch(BASE_URL + _id + '/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: { name: newShoppingItem } })
    });
    return true;
}

export async function deleteItemFromShoppingList(_id: string, _item_id: string): Promise<boolean> {
    await safeFetch(BASE_URL + _id + '/items/' + _item_id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return true;
}

export async function safeFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const response = await fetch(input, init);

    if (!response.ok) {
        let errorMessage = 'Unexpected error';

        try {
            const body = await response.json();
            errorMessage = body?.error || body?.message || errorMessage;
        } catch {
        }

        throw new Error(errorMessage);
    }

    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type') || '';

    if (contentLength === '0' || !contentType.includes('application/json')) {
        return undefined as T;
    }

    return response.json();
}

