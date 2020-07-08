import React, { Component }  from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../redux/user/actions";
import {NotificationManager} from "react-notifications";

import './index.css';
import {Redirect} from "react-router-dom";

class  RegisterPage extends  Component {
    static propTypes = {
        registerUser: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        userInfo: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            password: ""
        };
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onRegisterClicked = this.onRegisterClicked.bind(this);
    }

    onPasswordChanged(event) {
      const { value } = event.target;
      this.setState({
          password: value
      });
    }

    onEmailChanged(event) {
        const { value } = event.target;
        this.setState({
            email: value,
        });
    }

    onNameChanged(event) {
        const { value } = event.target;
        this.setState({
            name: value,
        });
    }

    validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    onRegisterClicked() {
        const { email, password, name } = this.state;
        const { registerUser } = this.props;
        if(email === "" || password === "" || name === "" || !this.validateEmail(email)) {
            NotificationManager.error("User email, password and name cant  be empty or wrong email", '' ,5000);
            return;
        }
        registerUser({email, password, name});
    }

    render() {
        const { isLoading, userInfo } = this.props;
        if (userInfo.get("id") !== null) {
            return <Redirect to="/" />;
        }

        return (
            <div className="signup-form">
                <h2>Sign Up</h2>
                <p>Please fill in this form to create an account!</p>
                <hr/>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text">
                            <span className="fa fa-user"/>
                        </span>
                        </div>
                        <input type="text" onChange={this.onNameChanged} className="form-control" name="username" placeholder="Full Name"
                               required="required"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-paper-plane"/>
                        </span>
                        </div>
                        <input type="email"  onChange={this.onEmailChanged} className="form-control" name="email" placeholder="Email"
                               required="required"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-lock"/>
                        </span>
                        </div>
                        <input type="password" onChange={this.onPasswordChanged} className="form-control" name="password" placeholder="Password"
                               required="required"/>
                    </div>
                </div>

                <div className="form-group">
                    <button type="button" onClick={this.onRegisterClicked} disabled={isLoading} className="btn btn-primary btn-lg">
                        {isLoading && <span className="spinner-border spinner-border-sm" />}
                        Sign Up
                    </button>
                </div>

                <div className="text-center">Already have an account? <a href="/login">Login here</a></div>
            </div>
        )
    }
}

const mapStateToProps = ({userData}) => {
    const isLoading = userData.getIn(["ui", "loading"]) ;
    const userInfo = userData.get("userInfo");
    return {
        isLoading,
        userInfo,
    }
}

const  mapDispatchToProps = {
    registerUser: actions.register,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
