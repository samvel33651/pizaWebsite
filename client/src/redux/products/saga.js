import { takeEvery, put, call, all, fork } from 'redux-saga/effects';
import actions from './actions';
import productsApi from '../../helpers/api/products';
import { NotificationManager } from 'react-notifications';

function* getProducts() {
    yield takeEvery(actions.GET_PRODUCTS, function*() {
        try{
            yield put(actions.setUi(true));
            const res = yield call(productsApi.getProducts);
            if(res.status === "Ok") {
                yield put(actions.setProducts(res.products));
                NotificationManager.success('Products fetched successfully!', '' ,5000);
            }
        } catch(e){
            console.log(e);
            NotificationManager.error("Something went wrong. Try  again.", '' ,5000);
        }
        yield put(actions.setUi());
    })
}

export default function * productsSaga() {
    yield all([
        fork(getProducts),
    ])
}
