import { createSelector } from 'reselect';
import { List } from 'immutable';

const emptyList = new List();

export  const productsSelector = state => state.products;

export const  dataSelector = createSelector(
    productsSelector,
    products => products.get("data") || emptyList
)

export const  loadingSelector = createSelector(
    productsSelector,
    products => products.getIn(['ui', 'loading'])
)

export const productSelector = (prod_id) => createSelector(
    dataSelector,
    data => data.find((item) => +item.prod_id === +prod_id)
)
