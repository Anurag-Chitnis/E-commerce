import React, {useState} from "react";
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.components';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {fetchCollectionStart} from '../../redux/shop/shop.actions';
import {createStructuredSelector} from 'reselect';
import {selectIsCollectionFetching} from '../../redux/shop/shop.selector';
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {

    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
       const {fetchCollectionStart} = this.props;
       fetchCollectionStart();
    }

    render() {
        const {match, isCollectionFetching} = this.props;
        return(
            <div className="shop-page">
                <Switch>
                    <Route exact path={`${match.path}`}
                        render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>}
                    />
                    <Route path={`${match.path}/:collectionId`}
                        render={(props) => <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props}/>}
                    />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionStart: () => dispatch(fetchCollectionStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);