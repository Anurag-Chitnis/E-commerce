import React from "react";
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.components';
import {Route, Switch} from 'react-router-dom';

const ShopPage = ({match}) => {
    console.log(match.path)
    return(
        <div className="shop-page">
            <Switch>
                <Route exact path={`${match.path}`} component={CollectionOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </Switch>
        </div>
    )
}

export default ShopPage;