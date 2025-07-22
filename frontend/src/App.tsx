import React from 'react';
import './App.css';
import ShoppingLists from './components/shopping-list/shopping-lists.components';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ShoppingListDetail from "./components/shopping-list/shopping-list-detail.component";
import {AddNewShoppingList} from "./components/shopping-list/add-new-shopping-list.component";
import EditShoppingList from "./components/shopping-list/edit-shopping-list.component";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<ShoppingLists/>}/>
                <Route path={'/new-shopping-list'} element={<AddNewShoppingList/>}/>
                <Route path={'/shopping-lists/:id'} element={<ShoppingListDetail/>}/>
                <Route path={'/shopping-lists/:id/edit'} element={<EditShoppingList/>}/>
            </Routes>
        </BrowserRouter>)
}

export default App;
