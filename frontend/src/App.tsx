import React from 'react';
import './App.css';
import ShoppingLists from './components/shopping-lists.components';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Shopping cart</p>
            </header>
            <div className='App-body'>
                <button>Create new shopping list</button>
                <div>
                    <p>Your shopping lists</p>
                    <ShoppingLists/>
                </div>
            </div>
        </div>
    );
}

export default App;
