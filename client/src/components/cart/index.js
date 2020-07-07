import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { cartSelector, priceSelector } from "../../redux/user/selectors";
import CartItem from "./cartItem";
import actions from "../../redux/products/actions"
import { Link } from "react-router-dom";
import PriceBlock from "../priceBlock";
import CheckoutForm from "../checkoutForm";
import './index.css';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state ={
            showForm: false,
        }
        this.toggleForm = this.toggleForm.bind(this);
    }
    componentDidMount() {
        const { getProducts } = this.props
        getProducts();
    }
    renderItems() {
        const { cart } = this.props;
        if(!cart.length) {
            const img = require('../../pictures/emptyBasket.png');
            return (
                <div className="row empty-cart align-middle">
                    <div  className="col-md-12">
                        <img src={img} al="cart" />
                        <p className="text-center emptyText">Cart is empty</p>
                        <p className="text-center goToHome"><Link  className="btn btn-danger" to="/">Go to menu</Link></p>
                    </div>

                </div>
            )
        }
        return cart.map((item) => {
            return <CartItem key={item.prod_id} item={item} />
        })
    }

    toggleForm() {
        this.setState((state) => {
            return {
                showForm: !state.showForm,
            }
        })
    }

    render() {
        const { overallPrice } = this.props;
        const { showForm } = this.state;

        if(showForm) {
            return <CheckoutForm totalPrice={overallPrice} />;
        }
        return(
            <Fragment>
                {this.renderItems()}
                <PriceBlock oP={overallPrice} />
                <button onClick={this.toggleForm} type="button" className="btn btn-danger float-right checkout">Checkout</button>
            </Fragment>
        )
    }
}

const mapSetToProps = (state) => {
    const cart = cartSelector(state)
    const overallPrice = priceSelector(state);
    return {
        cart,
        overallPrice
    };
}

const mapDispatchToProps = {
    getProducts: actions.getProducts,
}


export default connect(mapSetToProps, mapDispatchToProps)(Cart)
