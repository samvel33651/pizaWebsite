import React, { Component }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from './product';
import Immutable, { List } from 'immutable';
import { dataSelector, loadingSelector } from '../../redux/products/selectors'
import actions from '../../redux/products/actions';

const emptyList = new List();

class  Products extends Component {
    static propTypes = {
        products: PropTypes.instanceOf(Immutable.Iterable),
        getProducts: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
    }
    static defaultProps = {
        products: emptyList,
        isLoading: true,
    }

    componentDidMount() {
        const { getProducts } = this.props;
        getProducts();
    }

    renderProducts() {
        const { products } = this.props;
        console.log(products);
        if (!products.size) {
           return 'No Products  TO Show';
        }

        return products.map((product) => {
            return <Product key={product.prod_id} product={product} />
        })
    }

    render(){
        const { isLoading } = this.props;
        if(isLoading) {
            return 'Loading';
        }

        return (
            <div  className="row">
                {this.renderProducts()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const products = dataSelector(state);
    const isLoading = loadingSelector(state);
    return {
        products,
        isLoading
    }
}

const mapDispatchToProps = {
    getProducts: actions.getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
