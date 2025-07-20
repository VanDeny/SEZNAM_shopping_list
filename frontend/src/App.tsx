import React from 'react';
import './App.css';
import ShoppingLists from "./components/shopping-lists.components";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Shopping list</p>
                <button>Create new shopping list</button>
                <ShoppingLists/>
            </header>
        </div>
    );
}

export default App;
