import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.components";
import ShopPage from './pages/shopage/shop.components';
import Header from './components/header/header.components';
import SignInAndSignUp from './pages/signInAndSignUp/signInAndSignUp.components';

import {auth} from './components/firebase/firebase-utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})

      console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }



  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component= {ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUp}/>
        </Switch>
      </div>
    );
  }
}

export default App;