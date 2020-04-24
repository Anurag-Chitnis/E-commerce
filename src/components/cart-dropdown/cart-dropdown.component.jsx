import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.components';
import CartItem from '../cart-item/cart-item.component';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {selectCartItems} from '../../redux/cart/cart.selector';
import {toggleCartDropdown} from '../../redux/cart/cart.actions';

const CartDropDown = ({cartItems, history: {push}, dispatch}) => {
    return(
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ? 
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>): 
                    <span className="empty-items">Your cart is empty</span>
                }
            </div>
            <CustomButton onClick={() => {
                push("/checkout");
                dispatch(toggleCartDropdown())
            }}>GO TO CHECKOUT</CustomButton>
        </div>
    );
}

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

export default withRouter(connect(mapStateToProps)(CartDropDown));