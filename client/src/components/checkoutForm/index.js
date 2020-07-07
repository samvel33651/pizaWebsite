import React, { Component }  from "react";
import { connect } from "react-redux";
import { userInfoSelector} from "../../redux/user/selectors"
import "./index.css";

class CheckoutForm extends Component {

    constructor(props) {
        super(props);
        this.state= {
            address: '',
            error: false,
        }
        this.onAddressChanged = this.onAddressChanged.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }

    onAddressChanged(event) {
        const { value } = event.target;
        const error = value.length < 5;
        this.setState({
            address: value,
            error
        });
    }

    placeOrder(event) {
        event.preventDefault();
        const { address, error } = this.state;
        if(address === "" || address.length < 5) {
            this.setState({
                error: true,
            })
            return;
        }

    }

    render() {
        const { userInfo, totalPrice } = this.props;
        const { error, address } = this.state;
        return (
           <div className="deliveryForm">
               <span className="text">Total Price: {totalPrice}</span>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email" className="form-control" disabled value={userInfo.get("email")} placeholder="Email"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Name</label>
                        <input type="text" className="form-control"  disabled value={ userInfo.get("name") } placeholder="Password"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" required onChange={this.onAddressChanged} value={address} placeholder="1234 Main St"/>
                </div>
                <button type="button" onClick={this.placeOrder}  disabled={error} className="btn btn-success float-right">PlaceOrder</button>
               { error &&<div className="alert alert-danger error-msg">
                   <strong>Error!</strong> Address field can`t be empty  or its length cant  be less than 5 symbols
               </div>
               }
            </div>
        );
    }
}

const  mapStateToProps = (state) => {
    const userInfo = userInfoSelector(state);
    return {
        userInfo,
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
