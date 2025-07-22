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
        refresh()
    }, [id]);

    const refresh = () => {
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
        setIsLoading(true);
        try {
            editShoppingListName({_id: id, name: newShoppingListName} as Partial<IShoppingList>)
                .then(() => {
                        setTimeout(() => {
                            setIsLoading(false);
                            navigate('/');
                        }, 1000);
                    }
                );
        } catch (e) {
            setIsLoading(false);
            console.error(e);
        }
    }

    return (<div className={'shopping-list-body'}>
        Edit name:
        <input value={newShoppingListName} onChange={(e) => handleInputChange(e)}/>
        <button onClick={() => editShoppingList()}>
            Edit
        </button>
        {isLoading && <SpinnerOverlay />}
    </div>);
}