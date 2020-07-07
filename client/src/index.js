import React, { Fragment } from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, compose, createStore} from "redux";
import { Provider } from 'react-redux';
import { rootReducer } from "./redux/rootReducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const  store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);

const  app = (
    <Provider store={store}>
        <Fragment>
            <App />
        </Fragment>

    </Provider>
)

render(app,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
