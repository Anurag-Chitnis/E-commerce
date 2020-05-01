import React from "react";
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.components';
import {Route, Switch} from 'react-router-dom';
import { firestore, convertCollectionSnapshotToMap } from '../../components/firebase/firebase-utils';
import {updateCollections} from '../../redux/shop/shop.actions';
import {connect} from 'react-redux';

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;

        const collectionRef = firestore.collection('collections');
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot.docs);
            updateCollections(collectionsMap);
        })
    }

    render() {
        const {match} = this.props;
        return(
            <div className="shop-page">
                <Switch>
                    <Route exact path={`${match.path}`} component={CollectionOverview} />
                    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
                </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);