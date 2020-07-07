import React, { Fragment }  from 'react';
import PriceBlock from "../priceBlock";
import "./order.css";


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
            <PriceBlock oP={overAllPrice} />
        </div>
    )
}

export default Order;
