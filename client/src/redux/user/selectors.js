import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import { dataSelector } from '../products/selectors';

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

export const orderItemSelector = (id) => createSelector(
    ordersSelector,
    ordersData => ordersData.getIn(["newOrder", `${id}`]) || {},
)

export const cartSelector = createSelector(
    ordersSelector,
    ordersData => {
        const newOrder = ordersData.get("newOrder");
        const [...data] = newOrder.values();
        return data;
    }
)

export const priceSelector = createSelector(
    cartSelector,
    dataSelector,
    (cart, products) => {
        let overallPrice = 0;
        if (cart.length) {
            for (let  i = 0; i < cart.length ; i++) {
                const { prod_id, quantity } = cart[i];
                const product = products.find((item) => item.prod_id === prod_id);
                if (product) {
                   const { price } = product;
                   overallPrice += price * quantity;
                }
            }
        }
        return overallPrice;
    }
)
