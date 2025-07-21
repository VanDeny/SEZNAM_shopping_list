import {useEffect, useState} from "react";
import {IShoppingList} from "../models/shoppingList.model";
import { pullShoppingLists, deleteShoppingList } from '../services/api/api';
import {confirm} from "./modal/yes-no-modal.modal";

export default function ShoppingLists() {
    const [shoppingListArray, setShoppingListArray] = useState<IShoppingList[]>([]);

    const refresh = () => {
        pullShoppingLists()
            .then(data => setShoppingListArray(data));
    }

    useEffect(() => {
        refresh();
    }, []);

    const handleDelete = async (_id: string) => {
        if(await confirm('Do you want to delete this shopping list?')) {
            await deleteShoppingList(_id);
            refresh();
        }
    }

    return (
        <ul>
            { shoppingListArray.map(shoppingList => (
                <li key={shoppingList._id} onClick={() => console.log('ha, gayyyyyy')}>
                    <div>
                        <div>{shoppingList.name}</div>
                        <div className="shopping-list-buttons">
                            <button>Edit</button>
                            <button onClick={async (e) => {
                                e.stopPropagation();
                                await handleDelete(shoppingList._id);
                            }}>Delete</button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}