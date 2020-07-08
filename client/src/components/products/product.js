import React, { Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux";
import actions from "../../redux/user/actions";
import { orderItemSelector } from "../../redux/user/selectors";
import fromUSDToEUR from "../../helpers/currencyConverter";
import QuantityInput from "../../components/quantityInput";
import "./product.css";

class Product extends Component {
    static propTypes = {
        orderItem: PropTypes.object,
        addToCart: PropTypes.func.isRequired,
        changeOrderQTY: PropTypes.func.isRequired,
        setCartToStorage: PropTypes.func.isRequired,
        removeFromOrder: PropTypes.func.isRequired,
    }

    static  defaultProps = {
        orderItem: {}
    }

    constructor(props) {
        super(props);
        const { orderItem } = this.props;
        const id = orderItem.prod_id || null;
        const qty = orderItem.quantity || 1;
        this.state = {
          id,
          qty,
        };
        this.addToCart = this.addToCart.bind(this);
        this.changeQty = this.changeQty.bind(this);
        this.onPlusClicked = this.onPlusClicked.bind(this);
        this.onMinusClicked = this.onMinusClicked.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
    }
    addToCart() {
        const { product: { prod_id }, addToCart, setCartToStorage } = this.props;
        const { qty } = this.state;
        this.setState({
            id: prod_id,
        });
        addToCart({prod_id, quantity: qty });
        setCartToStorage();
    }

    changeQty(event) {
        let { value } = event.target;
        const { id } = this.state;
        if ( value > 1 ) {
            value = parseInt(value);
        } else {
            value = 1
        }
        this.setState({
            qty: value
        });
        this.handleOrderChange(id, value);
    }

    handleOrderChange(id, value) {
        const { changeOrderQTY, setCartToStorage } = this.props;
        changeOrderQTY(id, value);
        setCartToStorage();
    }

    onPlusClicked(event) {
        event.preventDefault();
        const {id, qty} = this.state;
        const maxQTY = 15
        let newQty  = qty + 1;
        if(newQty > maxQTY) {
            newQty = maxQTY;
        }
        this.setState({
            qty: newQty,
        });
        this.handleOrderChange(id, newQty);
    }

    onMinusClicked(event) {
        const {id, qty } = this.state;
        const { removeFromOrder, setCartToStorage } = this.props;
        let newQty = qty - 1;
        if(newQty <= 0) {
            this.setState({
                id: null,
                qty: 1,
            });
            removeFromOrder(id);
            setCartToStorage();
            return;
        }
        this.setState({
            qty: newQty,
        })
        this.handleOrderChange(id, newQty);
    }

    render() {
        const { product } = this.props;
        const { id, qty } = this.state;
        const { description, img_src, title, price } = product;
        const img = require('../../' + img_src);

        return (
            <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top"
                         src={img}
                         alt={title}
                         data-holder-rendered="true"/>
                        <div className="card-body">
                            <p className="card-text text-title">{title}</p>
                            <p className="card-text text-description">{description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    {id ? (
                                        <QuantityInput
                                            onMinusClicked={this.onMinusClicked}
                                            onPlusClicked={this.onPlusClicked}
                                            qty={qty}
                                            changeQty={this.changeQty}
                                        />
                                    ): ( <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.addToCart}>Add to cart</button>)
                                    }
                                </div>
                                <small className="text-muted">{`${(qty * price).toFixed(2)}$ / ${fromUSDToEUR(qty * price)}`}</small>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { product: {prod_id} } = ownProps;
    const orderItem = orderItemSelector(prod_id)(state);
    return {
        orderItem
    }
}

const  mapDispatchToProps = {
    addToCart: actions.addNewOrder,
    changeOrderQTY: actions.changeOrderQTY,
    setCartToStorage: actions.setCartToStorage,
    removeFromOrder: actions.removeFromOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
