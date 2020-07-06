import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/user/actions';
import { ordersLoaderSelector, userInfoSelector, userOrdersSelector} from '../../redux/user/selectors';
import Order from './order';
import './index.css';

class Orders extends Component {

    componentDidMount() {
        const { userID, getUerOrders } = this.props;
        if (userID) {
            getUerOrders(userID);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { userID, getUerOrders } = this.props;
        if(prevProps.userID !== userID) {
            getUerOrders(userID);
        }
    }

    renderOrders() {
        const { orders } = this.props;
        const orderIds = Object.keys(orders);
        const result = [];
        for (let i = 0; i< orderIds.length; i++) {
            const id = orderIds[i];
            const order = orders[id];
            result.push(<Order data={order} key={id} />);
        }
        return result;
    }

    render() {
        const { isLoading } = this.props;
        if(isLoading){
            return <div className="spinner-border loader"/>
        }
        return(
            <Fragment>
                <h1>Orders</h1>
                {this.renderOrders()}
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    const userInfo = userInfoSelector(state);
    const userID = userInfo.get("id");
    const orders = userOrdersSelector(state);
    const isLoading = ordersLoaderSelector(state);
    return {
        isLoading,
        userID,
        orders,
    }
}

const mapDispatchToProps = {
    getUerOrders: actions.getUserOrders,
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
