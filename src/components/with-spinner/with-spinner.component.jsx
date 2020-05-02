import React from 'react';
import './with-spinner.styles.scss';

const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => {
    console.log(isLoading);
    return isLoading ? (
        <div className="SpinnerOverlay">
            <div className="SpinnerContainer"></div>
        </div>
    ) : (
        <WrappedComponent {...otherProps}/>
    ) 
        
}

export default WithSpinner;