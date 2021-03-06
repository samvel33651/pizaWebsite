import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {cartSelector, priceSelector, userInfoSelector} from "../../redux/user/selectors";
import CartItem from "./cartItem";
import actions from "../../redux/products/actions";
import userActions from "../../redux/user/actions";
import { Link } from "react-router-dom";
import PriceBlock from "../priceBlock";
import CheckoutForm from "../checkoutForm";
import {NotificationManager} from "react-notifications";
import './index.css';

class Cart extends Component {
    static propTypes = {
        cart: PropTypes.array,
        overallPrice: PropTypes.number,
        userInfo: PropTypes.object,
        getProducts: PropTypes.func.isRequired,
        placeOrder: PropTypes.func.isRequired
    }

    static defaultProps = {
        cart: [],
        overallPrice: 0,
        userInfo: {}
    }

    constructor(props) {
        super(props);
        this.state ={
            showForm: false,
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }

    componentDidMount() {
        const { getProducts } = this.props
        getProducts();
    }

    renderItems() {
        const { cart } = this.props;
        return cart.map((item) => {
            return <CartItem key={item.prod_id} item={item} />
        })
    }

    toggleForm() {
        const { userInfo, history } = this.props;
        const userID = userInfo.get("id");
        if(!userID) {
            NotificationManager.info("Please login.", '' ,5000);
            history.push({
                pathname: '/login',
                state: {
                    from: this.props.location.pathname
                }
            });
            return;
        }
        this.setState((state) => {
            return {
                showForm: !state.showForm,
            }
        })
    }

    placeOrder(address) {
        const { placeOrder } = this.props;
        placeOrder(address);
        this.setState({
            showForm: false,
        })
    }

    render() {
        const { overallPrice, cart, userInfo } = this.props;
        const { showForm } = this.state;

        if(!cart.length) {
            const img = require('../../pictures/emptyBasket.png');
            return (
                <div className="row empty-cart align-middle">
                    <div  className="col-md-12">
                        <img src={img} alt="cart" />
                        <p className="text-center emptyText">Cart is empty</p>
                        <p className="text-center goToHome"><Link  className="btn btn-danger" to="/">Go to menu</Link></p>
                    </div>

                </div>
            )
        }

        if(showForm) {
            return <CheckoutForm onOrderPlace={this.placeOrder} userInfo={userInfo} />;
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
    const userInfo = userInfoSelector(state);
    return {
        cart,
        overallPrice,
        userInfo
    };
}

const mapDispatchToProps = {
    getProducts: actions.getProducts,
    placeOrder: userActions.placeOrder
}


export default connect(mapSetToProps, mapDispatchToProps)(Cart)
