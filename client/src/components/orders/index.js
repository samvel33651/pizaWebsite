import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../redux/user/actions";
import { ordersLoaderSelector, userInfoSelector, userOrdersSelector} from "../../redux/user/selectors";
import Order from "./order";
import Loader from "../loader";

import './index.css';

class Orders extends Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        userID: PropTypes.number,
        orders: PropTypes.object,
        getUerOrders: PropTypes.func.isRequired,
    }

    static defaultProps = {
        isLoading: false,
        userID: null,
        orders: {},
    }

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
        if (!orderIds.length) {
           return (<h3 className="text-center">No orders to show</h3>) ;
        }
        const sortedIds = orderIds.sort((a, b) => b - a);
        const result = [];
        for (let i = 0; i< sortedIds.length; i++) {
            const id = sortedIds[i];
            const order = orders[id];
            result.push(<Order data={order} key={id} />);
        }
        return result;
    }

    render() {
        const { isLoading } = this.props;
        if(isLoading){
            return <Loader />;
        }
        return(
            <Fragment>
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
