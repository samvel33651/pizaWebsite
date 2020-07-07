import React, { Component }  from "react";
import { connect } from "react-redux";
import { userInfoSelector} from "../../redux/user/selectors";
import actions from "../../redux/user/actions"
import { NotificationManager } from 'react-notifications';
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
        });
    }

    placeOrder(event) {
        event.preventDefault();
        const { onOrderPlace } = this.props;
        const { address } = this.state;
        if(address === "" || address.length < 5) {
            NotificationManager.error("Address is required  and its length  must  be more than 5", '' ,5000);
            return;
        }
        onOrderPlace(address);
        this.setState({
            disabled : true,
        });
    }

    render() {
        const { userInfo, totalPrice } = this.props;
        const {  address, disabled } = this.state;
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
                <button type="button" onClick={this.placeOrder}  disabled={disabled} className="btn btn-success float-right">PlaceOrder</button>
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
