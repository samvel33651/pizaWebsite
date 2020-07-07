import React, { Fragment } from "react";
import { deliveryPrice } from "../../constants/currencies";
import fromUSDToEUR from "../../helpers/currencyConverter";
import "./index.css"

const PriceBlock = ({ oP }) => {
    return (
        <Fragment>
            <span className="price">
                <span className="deliveryPrice"> Delivery: </span>
                <span className="price-text">{deliveryPrice}$ / {fromUSDToEUR(deliveryPrice)}</span>
            </span>
            <span className="price">
                <span className="pizzaPrice"> Price:  </span>
                <span className="price-text">{oP.toFixed(2)}$ / {fromUSDToEUR(oP)}</span>
            </span>

            <span className="price">
                <span className="totalPrice">Total Price :</span>
                <span className="price-text total-text">{(deliveryPrice + oP).toFixed(2)}$ / {fromUSDToEUR(oP + deliveryPrice)}</span>
            </span>
        </Fragment>

    );
}

export default PriceBlock;
