import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_VOocCKarYWEJp05TkHUrxxBc00fHGx6tSj';
    
    const onToken = token => {
        console.log(token);
        alert("payment successfull");
    }

    return(
        <StripeCheckout
            label='Pay now'
            name='CROWN Clothing'
            billingAddress
            shippingAddress
            description={`Your total is: ${price}`}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            currency="USD"
        />
    );
}

export default StripeButton;