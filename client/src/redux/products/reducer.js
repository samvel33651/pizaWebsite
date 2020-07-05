import { Map, List } from 'immutable';
import actions from './actions';

const  initialState = new Map({
    data: new List(),
    ui: new Map({
        loading: false,
    })
});

const  productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_PRODUCTS:
            const { data } = action.payload;
            return  state.set('data', new List(data));
        case actions.SET_UI:
            const { loading } = action.payload;
            return  state.setIn(['ui', 'loading'], loading);
        default:
            return state;
    }
}

export default productsReducer;
