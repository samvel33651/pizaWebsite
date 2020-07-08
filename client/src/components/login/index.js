import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../redux/user/actions";
import { userInfoSelector, loadingSelector } from "../../redux/user/selectors";
import { Redirect } from "react-router-dom";

import './index.css';

class  Login extends Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        userInfo: PropTypes.object,
        login: PropTypes.func.isRequired,
    }

    static defaultProps = {
        isLoading: false,
        userInfo: {},
    }

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
        };
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    onEmailChanged(event) {
        event.preventDefault();
        const email = event.target.value;
        this.setState({
            email,
        })
    }

    onPasswordChanged(event) {
        event.preventDefault();
        const password = event.target.value;
        this.setState({
            password,
        })
    }

    doLogin(event) {
        event.preventDefault();
        const {location} = this.props;
        let redirectTo = "/";
        if(location.state && location.state.from) {
            redirectTo =  location.state.from;
        }
        const { login } = this.props;
        const { email, password } = this.state;
        if (password !== '' && email !== '') {
            login({email, password} , redirectTo);
        }
    }

    componentWillUnmount() {
        const {location} = this.props;
        if(location.state && location.state.from) {
            this.props.history.push(location.state.from.pathname);
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        const { email, password } = this.state;
        const { isLoading, userInfo } = this.props;
        if(userInfo.get("id") !== null) {
          return <Redirect to="/" />;
        }
        return (
            <div className="login-form">
                    <h2 className="text-center">Log in</h2>
                    <div className="form-group">
                        <input type="text" className="form-control" onChange={this.onEmailChanged} value={email} placeholder="Email" required="required"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" onChange={this.onPasswordChanged} value= {password} placeholder="Password" required="required"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading} onClick={this.doLogin}>
                            {isLoading && <span className="spinner-border spinner-border-sm" />}
                            Log in
                        </button>
                    </div>
                <p className="text-center"><a href="/register">Create an Account</a></p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const isLoading = loadingSelector(state);
    const userInfo = userInfoSelector(state);
    return {
        isLoading,
        userInfo
    }
}

const mapDispatchToProps = {
    login: actions.login,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
