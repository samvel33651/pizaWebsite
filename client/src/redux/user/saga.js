import { takeEvery, put, call, all, fork, select } from 'redux-saga/effects';
import actions from './actions';
import authApi from '../../helpers/api/auth';
import ordersApi from '../../helpers/api/orders';

function getStoreData(state) {
    const { userData } = state;
    const newOrders = userData.getIn(['userOrders', 'newOrder']);
    return {
        newOrders,
    };
}

function* login() {
    yield takeEvery(actions.LOGIN_USER, function* (action) {
        try{
            const { data } = action.payload;
            yield put(actions.setUi(true));
            console.log(data);
            const res = yield call(authApi.authenticateUser, data );
            if(res.status) {
                const { userData } = res;
                console.log(userData);
                localStorage.setItem('userInfo', JSON.stringify(userData));
                yield put(actions.setUserInfo(userData));
                // yield put(actions.setProducts(res.products));
            }
        } catch(e){
            console.log(e);
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
            const res = yield call(authApi.registerUser, data );
            if(res){
                yield put(actions.authenticateUser({email, password}));
            }
        } catch(e){
            console.log(e);
        }
        yield put(actions.setUi());
    })
}

function* getUserOrders() {
    yield takeEvery(actions.GET_USER_ORDERS, function* (action) {
        try{
            const { userID } = action.payload;
            yield put(actions.toggleOrdersLoading(true));
            const res = yield call(ordersApi.getUserOrders, 15);
            if (res && res.data) {
                yield put(actions.setUserOrders(res.data));
            }
        } catch(e){
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

export default function* userAndOrdersSaga() {
    yield all([
        fork(login),
        fork(register),
        fork(getUserOrders),
        fork(appStart),
        fork(logout),
        fork(setCartToStorage),
    ])
}
