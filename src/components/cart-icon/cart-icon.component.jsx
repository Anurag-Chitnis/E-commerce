import React from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg.svg';
import './cart-icon.styles.scss';
import {connect} from 'react-redux';
import {toggleCartDropdown} from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';


const CartIcon = ({toggleCartDropdown, itemCount}) => (
    <div className="cart-icon">
        <ShoppingIcon className="shopping-icon" onClick={toggleCartDropdown}/>
        <span className="item-count">{itemCount}</span>
    </div>
) 

const mapStateToProps = state => {
    return {
        itemCount: selectCartItemsCount(state)
    }   
}

const mapDispatchToProps = dispatch => ({
    toggleCartDropdown: () => dispatch(toggleCartDropdown())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);