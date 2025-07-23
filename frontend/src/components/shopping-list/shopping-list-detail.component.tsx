import React, {useEffect, useState} from "react";
import {IShoppingList} from "../../models/shoppingList.model";
import {
    addNewItemToShoppingList,
    deleteItemFromShoppingList, editItemInShoppingList,
    getShoppingListByID
} from "../../services/api/api.service";
import {useNavigate, useParams} from "react-router-dom";
import {IShoppingItem} from "../../models/shoppingItem.model";
import {SpinnerOverlay} from "../overlay/spinner-overlay.component";

export default function ShoppingListDetail() {
    const {id} = useParams<{ id: string }>();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [shoppingList, setShoppingList] = useState<IShoppingList | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [shoppingListItem, setShoppingListItem] = useState<string>('');
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editedItemName, setEditedItemName] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            await refresh();
        };

        load();
    }, [id]);

    const refresh = async () => {
        if (id) {
            getShoppingListByID(id)
                .then(setShoppingList);
        }
    }

    const addNewItem = async () => {
        if (!shoppingList || !shoppingListItem) return;
        setErrorMessage(null);
        setIsLoading(true);
        try {
            await addNewItemToShoppingList(shoppingList._id, shoppingListItem);

            setShoppingListItem('');
            await refresh();
        } catch (e) {
            if (e instanceof Error) {
                setErrorMessage(e.message);
            } else {
                setErrorMessage('Unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
            setTimeout(() => setErrorMessage(null), 5000);
        }
    }

    const startEditingItem = (item: IShoppingItem) => {
        setEditingItemId(item._id);
        setEditedItemName(item.name);
    };

        const updateItem = async () => {
        if (!shoppingList || !editingItemId || !editedItemName) return;

        setIsLoading(true);
        setErrorMessage(null);
        try {
            await editItemInShoppingList(shoppingList._id, editingItemId, editedItemName);
            setEditingItemId(null);
            setEditedItemName('');
            await refresh();
        } catch (e) {
            if (e instanceof Error) {
                setErrorMessage(e.message);
            } else {
                setErrorMessage('Unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const deleteItem = async (itemToDelete: string) => {
        if (!itemToDelete || !shoppingList) return;
        setIsLoading(true);
        try {
            await deleteItemFromShoppingList(shoppingList._id, itemToDelete)
            setTimeout(() => {
                setIsLoading(false);
                setShoppingListItem('');
                refresh();
            }, 3000);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShoppingListItem(e.target.value);
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedItemName(e.target.value)
    }

    if (!shoppingList) return <p>Loading...</p>;

    const shoppingListItems = shoppingList.items.length === 0 ?
        <div>Shopping list is empty</div> :
        <ul>
            {shoppingList.items.map((item: IShoppingItem, i) => (
                <li key={i}>
                    {editingItemId === item._id ? (
                        <div>
                            <input
                                value={editedItemName}
                                onChange={(e) => handleEditChange(e)}
                            />
                            <button className={'add-button'} onClick={updateItem}>Update</button>
                            <button className={'delete-button'} onClick={() => {
                                setEditingItemId(null);
                                setEditedItemName('');
                            }}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            {item.name}
                            <div className={'shopping-list-buttons'}>
                                <button className={'edit-button'} onClick={() => startEditingItem(item)}>Edit item</button>
                                <button className={'delete-button'} onClick={() => deleteItem(item._id)}>Delete item</button>
                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>

    return (
        <div className={'shopping-list-body shopping-list-buttons'}>
            <button className={'back-button'} onClick={() => navigate('/')}>Back</button>
            <h2>{shoppingList.name}</h2>
            Add New Item
            <input value={shoppingListItem} onChange={(e) => handleInputChange(e)}/>
            <div className={''}>
                <button className={'add-button'} onClick={() => addNewItem()}>
                    Add new item
                </button>
            </div>
            {shoppingListItems}
            {isLoading && <SpinnerOverlay/>}
            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}