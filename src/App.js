import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import HomePage from "./pages/homepage/homepage.components";
import ShopPage from './pages/shopage/shop.components';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component= {ShopPage} />
      </Switch>
    </div>
  );
}

export default App;