import { apiRequest } from './index';

const placeOrder = (data) => {
    const req = {
        method: 'POST',
        url: '/orders/place',
        data,
    };

    return apiRequest(req);
};

const getUserOrders = (userID) => {
    const req = {
        method: "GET",
        url: `/orders/${userID}`,
    }
    return apiRequest(req);
}

const ordersApi = {
    placeOrder,
    getUserOrders
}

export default ordersApi;
