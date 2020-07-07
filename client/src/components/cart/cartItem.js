import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { productSelector } from '../../redux/products/selectors';
import isEmpty from 'lodash/isEmpty';
import QuantityInput from '../quantityInput';
import actions from "../../redux/user/actions";
import fromUSDToEUR from '../../helpers/currencyConverter';
import './cartItem.css';


class CartItem extends Component {
    static propTypes = {

    }

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        const { order: { prod_id, quantity } } = this.props;
        this.state ={
            prod_id: prod_id || null,
            quantity: quantity || 1,
        }
        this.onRemoveOrder = this.onRemoveOrder.bind(this);
        this.changeQty = this.changeQty.bind(this);
        this.onPlusClicked = this.onPlusClicked.bind(this);
        this.onMinusClicked = this.onMinusClicked.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
    }

    changeQty(event) {
        let { value } = event.target;
        const { prod_id } = this.state;
        if ( value > 1 ) {
            value = parseInt(value);
        } else {
            value = 1
        }
        this.setState({
            quantity: value
        });
        this.handleOrderChange(prod_id, value);
    }

    handleOrderChange(id, value) {
        const { changeOrderQTY, setCartToStorage } = this.props;
        changeOrderQTY(id, value);
        setCartToStorage();
    }

    onPlusClicked() {
        console.log('plus clickecd');
        const {prod_id, quantity} = this.state;
        const maxQTY = 15
        let newQty  = quantity + 1;
        if(newQty > maxQTY) {
            newQty = maxQTY;
        }
        this.setState({
            quantity: newQty,
        });
        this.handleOrderChange(prod_id, newQty);
    }

    onMinusClicked() {
        const {prod_id, quantity } = this.state;
        let newQty = quantity - 1;
        if(newQty <= 0) {
            this.setState({
                prod_id: null,
                quantity: 1,
            });
            this.onRemoveOrder();
            return;
        }
        this.setState({
            quantity: newQty,
        })
        this.handleOrderChange(prod_id, newQty);
    }

    onRemoveOrder() {
        const { setCartToStorage, removeFromOrder } = this.props;
        const { prod_id } = this.state;
        removeFromOrder(prod_id);
        setCartToStorage();
    }

    render() {
        const { order, product } = this.props;
        const { quantity } = this.state;
        if(isEmpty(product)) return null;
        const { prod_id, title, price, img_src  } = product;
        const img = require('../../' + img_src);
        return (
            <div className="order-item row" key={prod_id}>
                <div className="col-md-12 well">
                    <div className="col-md-3">
                        {/*<img src="http://placehold.it/100x100"></img>*/}
                        <img className="orderImg" src={img} />
                    </div>
                    <div className="col-md-2">
                        <span>{title}</span>
                    </div>
                    <div className="col-md-3">
                        <QuantityInput
                                onMinusClicked={this.onMinusClicked}
                                onPlusClicked={this.onPlusClicked}
                                qty={quantity}
                                changeQty={this.changeQty}
                            />
                    </div>
                    <div  className="col-md-2 priceColumn">
                        <span>{`${(price * quantity).toFixed(2)}$ / ${fromUSDToEUR(price * quantity)}`}</span>
                    </div>
                    <div className="col-md-2">
                        <button type="button" className="close" aria-label="Close" onClick={this.onRemoveOrder}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>

            // <div className="order-item">
            //     <span>{title}</span>
            //     <QuantityInput
            //         onMinusClicked={this.onMinusClicked}
            //         onPlusClicked={this.onPlusClicked}
            //         qty={quantity}
            //         changeQty={this.changeQty}
            //     />
            //     <span>{quantity * price}</span>
            //
            // </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
   const { item } = ownProps;
   const { prod_id } = item;
   const product = productSelector(prod_id)(state);
   return {
       order: item,
       product
   }
}

const mapDispatchToProps = {
    changeOrderQTY: actions.changeOrderQTY,
    setCartToStorage: actions.setCartToStorage,
    removeFromOrder: actions.removeFromOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
