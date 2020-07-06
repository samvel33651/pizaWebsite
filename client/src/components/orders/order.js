import React, { Fragment }  from 'react';
import "./order.css";
import fromUSDToEUR from '../../helpers/currencyConverter';

const Order = (props) => {
    const { data } = props;
    const deliveryPrice = 7.65;
    let overAllPrice = 0;
    return (
        <div className="order">
            {
                data.map((item) => {
                    const { description, title, img_src, price, qty, prod_id } = item;
                    overAllPrice +=(price * qty);
                    return (
                        <div className="order-item row" key={prod_id}>
                            <div className="col-md-12 well">
                                <div className="col-md-3">
                                    <img src="http://placehold.it/100x100"></img>
                                    {/*<img src={img_src} />*/}
                                </div>
                                <div className="col-md-6">
                                    <span>{title}</span>
                                </div>
                                <div  className="col-md-3 priceColumn">
                                    <span>{(price * qty).toFixed(2)}$</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <span className="price">Pizza Price: {overAllPrice.toFixed(2)}$ / {fromUSDToEUR(overAllPrice)}</span>
            <span className="price">Delivery Price: {deliveryPrice}$ / {fromUSDToEUR(deliveryPrice)} </span>
            <span className="price">Overall Price : {(deliveryPrice + overAllPrice).toFixed(2)}$ / {fromUSDToEUR(overAllPrice + deliveryPrice)}</span>
        </div>
    )
}

export default Order;
