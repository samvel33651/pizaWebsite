import  { all } from 'redux-saga/effects';
import productsSaga from './products/saga';
import userAndOrdersSaga from './user/saga';

export default function* rootSaga() {
    yield all([
        productsSaga(),
        userAndOrdersSaga()
    ]);
}
