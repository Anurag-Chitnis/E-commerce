import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.components";
import ShopPage from './pages/shopage/shop.components';
import Header from './components/header/header.components';
import SignInAndSignUp from './pages/signInAndSignUp/signInAndSignUp.components';

import {auth, createUserProfileDocument} from './components/firebase/firebase-utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        
        userRef.onSnapshot(snapshot => {
            this.setState({currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => console.log(this.state.currentUser))
        })
      }else {
        this.setState({currentUser: null})
      }
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