import React from "react";
import SHOP_DATA from './shop.data.js';
import CollectionPreview from '../../components/collection-preview/collection-preview.components';
class ShopPage extends React.Component {
    constructor() {
        super();
        this.state = {
            collections: SHOP_DATA,
        };
    }

    render() {
        const {collections} = this.state;
        return (
            <div className="collection-preview">
                {
                    collections.map(({id, ...otherCollectionProps}) => (
                        <CollectionPreview key={id} {...otherCollectionProps}/>
                    ))
                }
            </div>
        );
    }
}

export default ShopPage;