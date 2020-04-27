import React from 'react';
import CollectionPreview from '../collection-preview/collection-preview.components';
import {connect} from 'react-redux';
import {collectionForPreview} from '../../redux/shop/shop.selector';
import {createStructuredSelector} from 'reselect';

const CollectionOverview = ({collections}) => {
    console.log("THIS IS OVERVIEW PAGE")
    return(
        <div className="collection-overview">
            <div className="collection-preview">
                {
                    collections.map(({id, ...otherCollectionProps}) => (
                        <CollectionPreview key={id} {...otherCollectionProps}/>
                    ))
                }
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: collectionForPreview
})


export default connect(mapStateToProps)(CollectionOverview);