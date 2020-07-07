import React, { Fragment }  from 'react';
import PriceBlock from "../priceBlock";
import "./order.css";
import { DELIVERY_STATUS } from "../../constants/statusConstants";

const Order = (props) => {
    const { data } = props;
    const deliveryPrice = 7.65;
    let overAllPrice = 0;
    return (
        <div className="order">
            {
                data.map((item) => {
                    const { description, title, img_src, price, qty, prod_id, delivery_address, status } = item;
                    overAllPrice +=(price * qty);
                    const img = require('../../' + img_src);
                    return (
                        <div className="order-item row" key={prod_id}>
                            <div className="col-md-12 well">
                                <div className="col-md-2">
                                    <img className="orderImg" src={img} />
                                </div>
                                <div className="col-md-2">
                                    <span>{title}</span>
                                </div>
                                <div className="col-md-2">
                                  <span>{delivery_address}</span>
                                </div>
                                <div className="col-md-2">
                                    <span className="text-info">{DELIVERY_STATUS[status]}</span>
                                </div>
                                <div  className="col-md-4 priceColumn">
                                    <span>{(price * qty).toFixed(2)}$</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <PriceBlock oP={overAllPrice} />
        </div>
    )
}

export default Order;
