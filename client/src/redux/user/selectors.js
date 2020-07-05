import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

export const userSelector = state => state.userData;

export const userInfoSelector = createSelector(
    userSelector,
    user => user.get('userInfo')
);

export const loadingSelector = createSelector(
    userSelector,
    userData => userData.getIn(['ui', 'loading'])
)

export const ordersSelector = createSelector(
    userSelector,
    userData => userData.get("userOrders")
)

export const ordersLoaderSelector = createSelector(
    ordersSelector,
    ordersData => ordersData.getIn(['ui', 'loading'])
)

export const userOrdersSelector = createSelector(
    ordersSelector,
    orders => {
       const ordersList = orders.get("data");
       const groupedOrders = groupBy(ordersList, 'order_id');
       return groupedOrders;
    }
)
