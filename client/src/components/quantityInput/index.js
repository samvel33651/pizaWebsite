import React from "react";
import PropTypes from "prop-types";

const QuantityInput = ({onMinusClicked, changeQty ,qty, onPlusClicked }) => {
    return (
        <div className="input-group">
            <span className="input-group-btn">
                <button type="button" className="btn btn-danger btn-number" onClick={onMinusClicked} >
                    <span className=""> - </span>
                </button>
            </span>
            <input type="text" className="form-control qty-input input-number" onChange={changeQty} value={qty} min="1"  max="15"/>
            <span className="input-group-btn">
                <button type="button" className="btn btn-success btn-number" onClick={onPlusClicked} >
                    <span className="">+</span>
                </button>
            </span>
        </div>
    )
}

QuantityInput.propTypes = {
    onMinusClicked: PropTypes.func.isRequired,
    changeQty: PropTypes.func.isRequired,
    qty: PropTypes.number.isRequired,
    onPlusClicked: PropTypes.func.isRequired,
}

export default QuantityInput;
