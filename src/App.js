import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.components";
import ShopPage from './pages/shopage/shop.components';
import Header from './components/header/header.components';
import Checkout from  './pages/checkout/checkout.component';
import SignInAndSignUp from './pages/signInAndSignUp/signInAndSignUp.components';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.action';
import {auth, createUserProfileDocument} from './components/firebase/firebase-utils';
import {currentUserSelector} from './redux/user/user.selector';

class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        
        })
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
          <Route path='/shop' component= {ShopPage} />
          <Route exact path='/signin' component={() => this.props.currentUser ? (<Redirect to='/' />): (<SignInAndSignUp />)}/>
          <Route exact path='/checkout' component={Checkout} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);