import React from 'react';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.components';

const CollectionItem = ({id, name, price, imageUrl}) => (
    <div className="collection-item">
        <div className="image" style={{
            backgroundImage: `url(${imageUrl})`
        }}></div>
        <div className="collection-footer">
            <div className="name">{name}</div>
            <div className="price">{price}</div>
        </div>
        <CustomButton inverted>Add to cart</CustomButton>
    </div>
)  

export default CollectionItem;