import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.components";
import ShopPage from './pages/shopage/shop.components';
import Header from './components/header/header.components';
import SignInAndSignUp from './pages/signInAndSignUp/signInAndSignUp.components';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.action';
import {auth, createUserProfileDocument} from './components/firebase/firebase-utils';

class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        
        userRef.onSnapshot(snapshot => {
          this.props.setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        
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
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component= {ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUp}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);