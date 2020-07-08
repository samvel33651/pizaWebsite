import { Map } from 'immutable';
import actions from './actions';

const initialState = new Map({
    userInfo: new Map({
        name: 'guest',
        id: null,
        email: null,
    }),

    appStarted: false,

    ui: new Map({
        loading: false,
    }),

   userOrders: new Map({
       newOrder: new Map({}),
       data: [],
       ui: new Map({
           loading: false,
       })
   }),

});

const userReducer  = (state = initialState, {type , payload}) => {
    switch (type) {
        case actions.SET_USER_INFO:
            const { userInfo } = payload;
            return state.set("userInfo", new Map(userInfo));
        case actions.SET_USER_ORDERS: {
            const { data } = payload;
            return state.setIn(["userOrders", "data"], data);
        }
        case actions.TOGGLE_ORDERS_LOADING: {
            const { loading } = payload;
            return state.setIn(["userOrders", "ui", "loading"], loading);
        }
        case actions.UI_SET: {
            const { loading } = payload;
            return state.setIn(['ui', 'loading'], loading);
        }
        case actions.ADD_TO_NEW_ORDER:
            const { order } = payload;
            return state.setIn(["userOrders", "newOrder", `${order.prod_id}`], order);
        case actions.REMOVE_FROM_NEW_ORDERS:
            return state.removeIn(["userOrders", "newOrder", `${payload.prodID}`]);
        case actions.CHANGE_ORDER_QUANTITY:
            const { qty} = payload;
            return state.setIn(["userOrders", "newOrder", `${payload.prodID}`, "quantity"], qty);
        case actions.RESET_NEW_ORDER:
            return  state.setIn(["userOrders", "newOrder"], new Map({}));
        case actions.SET_APP_STARTED:
            const { status } = payload;
            return  state.set("appStarted", status);
        case actions.RESET_USER_INFO:
            const defaultUserInfo = initialState.get('userInfo');
            return state.set("userInfo", defaultUserInfo);
        case actions.SET_NEW_ORDERS:
            const { newOrders } = payload;
            return state.setIn(["userOrders", "newOrder", ], new Map(newOrders));
        default:
            return  state;
    }
}

export default userReducer;
