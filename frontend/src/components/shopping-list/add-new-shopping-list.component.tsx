import React, {useState} from 'react';
import {createShoppingList} from "../../services/api/api.service";
import {IShoppingList} from "../../models/shoppingList.model";
import {SpinnerOverlay} from "../overlay/spinner-overlay.component";
import {useNavigate} from "react-router-dom";

export function AddNewShoppingList() {
    const [newShoppingListName, setNewShoppingListName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewShoppingListName(e.target.value);
    }

    const createNewShoppingList = async () => {
        if(!newShoppingListName || /[\s\t]/.test(newShoppingListName)) return;
        setErrorMessage(null);
        setIsLoading(true);
        try {
            await createShoppingList({ name: newShoppingListName.trim() } as Partial<IShoppingList>);

            setNewShoppingListName('');
            navigate('/');
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

    return (<div className={'shopping-list-body shopping-list-buttons'}>
        <button className={'back-button'} onClick={() => navigate('/')}>Back</button>
        <h2>Create new shopping list</h2>
        <input value={newShoppingListName} onChange={(e) => handleInputChange(e)}/>
        <div className={'shopping-list-buttons'}>
            <button className={'add-button'} onClick={() => createNewShoppingList()}>
                Create
            </button>
        </div>
        {isLoading && <SpinnerOverlay />}
        {errorMessage && (
            <div className="error-message">
                {errorMessage}
            </div>
        )}
    </div>);
}