import { takeEvery, put, call, all, fork, select } from 'redux-saga/effects';
import actions from './actions';
import productActions from "../products/actions";
import authApi from '../../helpers/api/auth';
import ordersApi from '../../helpers/api/orders';
import { NotificationManager } from 'react-notifications';

function getStoreData(state) {
    const { userData } = state;
    const newOrders = userData.getIn(['userOrders', 'newOrder']);
    const userInfo = userData.get("userInfo");
    return {
        newOrders,
        userInfo,
    };
}

function* login() {
    yield takeEvery(actions.LOGIN_USER, function* (action) {
        try{
            const { data } = action.payload;
            yield put(actions.setUi(true));
            const res = yield call(authApi.authenticateUser, data );

            if(res.status) {
                const { userData } = res;
                console.log(userData);
                localStorage.setItem('userInfo', JSON.stringify(userData));
                yield put(actions.setUserInfo(userData));
                yield put(productActions.setProducts(res.products));
                NotificationManager.success('User Logged in successfully!', '' ,5000);
            }
        } catch(e){
            NotificationManager.error(e.data.message, '' ,5000);
        }
        yield put(actions.setUi(false));
    })
}

function* register() {
    yield takeEvery(actions.REGISTER_USER, function* (action) {
        try{
            const { email, password, name } = action.payload;
            yield put(actions.setUi(true));
            const data = { email, password, name };
            console.log(data);
            const res = yield call(authApi.registerUser, data );
            console.log(res);
            if(res){
                NotificationManager.success(res.message, '' ,5000);
                yield put(actions.authenticateUser({email, password}));
            }
        } catch(e){
            NotificationManager.error(e.data.message, '' ,5000);
        }
        yield put(actions.setUi());
    })
}

function* getUserOrders() {
    yield takeEvery(actions.GET_USER_ORDERS, function* (action) {
        try{
            const { userID } = action.payload;
            yield put(actions.toggleOrdersLoading(true));
            const res = yield call(ordersApi.getUserOrders, userID);
            if (res && res.data) {
                yield put(actions.setUserOrders(res.data));
                NotificationManager.success("User Orders fetched successfully", '' ,5000);
            }
        } catch(e){
            NotificationManager.error("Something went wrong. Try  again.", '' ,5000);
            console.log(e);
        }
        yield put(actions.toggleOrdersLoading(false));
    })
}

function* logout() {
    yield takeEvery(actions.LOGOUT, function*(){
        try{
            localStorage.removeItem('userInfo');
            yield put(actions.resetUserInfo());
            NotificationManager.success("User Logged out successfully", '' ,5000);
        } catch(e) {
            console.log(e);
        }
    });
}

function* appStart() {
    yield takeEvery(actions.APP_START, function* () {
        try{
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                yield put(actions.setUserInfo(userInfo));
            }
            const newOrders = JSON.parse(localStorage.getItem('newOrders'));
            if(newOrders) {
                yield put(actions.setNewOrders(newOrders));
            }

        } catch(e) {
            console.log(e);
            NotificationManager.error("Something went wrong during App  Start. Try  again.", '' ,5000);
        }
    });
}

function* setCartToStorage() {
    yield takeEvery(actions.SET_CART_TO_STORAGE, function*() {
        try {
            const { newOrders } = yield select(getStoreData);
            localStorage.setItem("newOrders", JSON.stringify(newOrders));
        } catch(e) {
            console.log(e);
        }

    });
}

function* placeOrder() {
    yield takeEvery(actions.PLACE_ORDER, function*(action) {
       try {
           const { deliveryAddress } = action.payload;
           const { newOrders, userInfo } = yield select(getStoreData);
           const [...orderItems] = newOrders.values();
           const data = {
               userID: userInfo.get('id'),
               delivery_address: deliveryAddress,
               data: orderItems,
           }
           const res = yield call(ordersApi.placeOrder, data );
           if (res.status) {
               NotificationManager.success("Order placed successfully. Currently  it is on the way!", '' ,5000);
               yield put(actions.resetNewOrder());
               yield put(actions.setCartToStorage());
           }
       } catch(e) {
           NotificationManager.success("Something went wrong. Please refresh  and try  again.", '' ,5000);
       }
    });
}

export default function* userAndOrdersSaga() {
    yield all([
        fork(login),
        fork(register),
        fork(getUserOrders),
        fork(appStart),
        fork(logout),
        fork(setCartToStorage),
        fork(placeOrder),
    ])
}
