import React from "react";
import CollectionPreview from '../../components/collection-preview/collection-preview.components';
import {connect} from 'react-redux';

const ShopPage = ({collections}) => (
    <div className="collection-preview">
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
            ))
        }
    </div>
);

const mapStateToProps = ({shop: {collections}}) => ({
    collections
})

export default connect(mapStateToProps)(ShopPage);