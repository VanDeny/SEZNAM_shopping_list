import {useEffect, useState} from "react";
import {IShoppingList} from "../../models/shoppingList.model";
import {deleteShoppingList, pullShoppingLists} from '../../services/api/api.service';
import {confirm} from "../modal/yes-no-modal.modal";
import {useNavigate} from 'react-router-dom';

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
        if (await confirm('Do you want to delete this shopping list?')) {
            await deleteShoppingList(_id);
            refresh();
        }
    }

    const handleEdit = async (_id: string) => {
        navigate(`/shopping-lists/${_id}/edit`);
    }

    const navigate = useNavigate();

    const toDetail = (_id: string) => {
        navigate(`/shopping-lists/${_id}`);
    }

    const toNewShoppingList = () => {
        navigate('/new-shopping-list');
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>Shopping cart</p>
            </header>
            <div className='App-body'>
                <div className="shopping-list-buttons">
                    <p>Your shopping lists</p>
                    <button className={'add-button'} onClick={() => toNewShoppingList()}>Create new shopping list</button>
                    <ul>
                        {shoppingListArray.map(shoppingList => (
                            <li key={shoppingList._id} onClick={() => toDetail(shoppingList._id)}>
                                <div>
                                    <div className={'list-name'}>{shoppingList.name}</div>
                                    <div>
                                        <button className={'edit-button'} onClick={async (e) => {
                                            e.stopPropagation();
                                            await handleEdit(shoppingList._id);
                                        }}>Edit
                                        </button>
                                        <button className={'delete-button'} onClick={async (e) => {
                                            e.stopPropagation();
                                            await handleDelete(shoppingList._id);
                                        }}>Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}