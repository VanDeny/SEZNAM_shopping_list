import {SpinnerOverlay} from "../overlay/spinner-overlay.component";
import React, {useEffect, useState} from "react";
import {editShoppingListName, getShoppingListByID} from "../../services/api/api.service";
import {IShoppingList} from "../../models/shoppingList.model";
import {useNavigate, useParams} from "react-router-dom";

export default function EditShoppingList () {
    const {id} = useParams<{ id: string }>();

    const [newShoppingListName, setNewShoppingListName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
                .then((data: IShoppingList) => {
                    setNewShoppingListName(data.name);
                });
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewShoppingListName(e.target.value);
    }

    const editShoppingList = async () => {
        if(!newShoppingListName || /[\s\t]/.test(newShoppingListName)) return;
        setIsLoading(true);
        try {
            await editShoppingListName({_id: id, name: newShoppingListName.trim()} as Partial<IShoppingList>);
            setTimeout(() => {
                setIsLoading(false);
                navigate('/');
            }, 1000);
        } catch (e) {
            setIsLoading(false);
            console.error(e);
        }
    }

    return (
        <div className={'shopping-list-body shopping-list-buttons'}>
        <button className={'back-button'} onClick={() => navigate('/')}>Back</button>
        Edit name:
        <input value={newShoppingListName} onChange={(e) => handleInputChange(e)}/>
        <button onClick={() => editShoppingList()}>
            Edit
        </button>
        {isLoading && <SpinnerOverlay />}
    </div>);
}