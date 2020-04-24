import React from 'react';
//Custom stylesheet for header component
import './header.styles.scss';
//React router DOM
import { Link } from 'react-router-dom';
//HOF for connecting component with redux state 
import {connect} from 'react-redux';
//Firebase utility import
import {auth} from '../firebase/firebase-utils'; 
//Custom Components import 
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import {ReactComponent as Logo} from '../../assets/crown.svg'; 
//Custom select with reselect library
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {currentUserSelector} from '../../redux/user/user.selector';
import {createStructuredSelector} from 'reselect';

const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className='logo'/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/contact">
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon />    
        </div>
        {
            hidden ? null: <CartDropDown />
        }         
    </div>
)

const mapStateToProps = state => createStructuredSelector({
    currentUser: currentUserSelector,
    hidden: selectCartHidden,
})
export default connect(mapStateToProps)(Header);