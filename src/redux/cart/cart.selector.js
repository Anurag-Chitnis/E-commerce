import { createSelector } from 'reselect'

const cartSelector = state => state.cart;

export const selectCartHidden = createSelector(
    [cartSelector],
    (cart) => cart.hidden
) 


export const selectCartItems = createSelector(
    [cartSelector],
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((acc, cartItem)  => 
        acc + cartItem.quantity,
        0
    )
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0)
);