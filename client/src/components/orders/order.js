import React  from "react";
import PropTypes from "prop-types";
import PriceBlock from "../priceBlock";
import { DELIVERY_STATUS } from "../../constants/statusConstants";

import "./order.css";

const Order = (props) => {
    const { data } = props;
    let overAllPrice = 0;
    return (
        <div className="order">
            {
                data.map((item) => {
                    const { title, img_src, price, qty, prod_id, delivery_address, status } = item;
                    overAllPrice +=(price * qty);
                    const img = require('../../' + img_src);
                    return (
                        <div className="order-item row" key={prod_id}>
                            <div className="col-md-12 well">
                                <div className="col-md-2">
                                    <img className="orderImg" src={img} alt={title} />
                                </div>
                                <div className="col-md-2">
                                    <span>{title}</span>
                                </div>
                                <div className="col-md-2">
                                    <span>x{qty}</span>
                                </div>
                                <div className="col-md-2">
                                  <span>{delivery_address}</span>
                                </div>
                                <div className="col-md-2">
                                    <span className="text-info">{DELIVERY_STATUS[status]}</span>
                                </div>
                                <div  className="col-md-2 priceColumn">
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

Order.propTypes = {
    data: PropTypes.array,
};

Order.defaultProps = {
    data: [],
}


export default Order;
