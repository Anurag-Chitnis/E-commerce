import React from "react";
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.components';
import {Route, Switch} from 'react-router-dom';
import { firestore, convertCollectionSnapshotToMap } from '../../components/firebase/firebase-utils';
import {updateCollections} from '../../redux/shop/shop.actions';
import {connect} from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {

    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;

        const collectionRef = firestore.collection('collections');
        collectionRef.get()
            .then(snapshot => {
                const collectionsMap = convertCollectionSnapshotToMap(snapshot.docs);
                updateCollections(collectionsMap);
                this.setState({loading: false})
            })

    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return(
            <div className="shop-page">
                <Switch>
                    <Route exact path={`${match.path}`}
                        render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/>}
                    />
                    <Route path={`${match.path}/:collectionId`}
                        render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}
                    />
                </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);