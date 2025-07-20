import ItemList from "./item-list/item-list.component";

export default function ShoppingLists () {
    return (<div>
        Array of shopping lists
        <div className={'shopping-list-buttons'}>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>);
}