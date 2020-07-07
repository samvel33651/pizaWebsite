import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import actions from '../../redux/user/actions';
import { userInfoSelector, loadingSelector } from '../../redux/user/selectors';
import { Redirect } from 'react-router-dom';

class  Login extends Component {
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
        const { login } = this.props;
        const { email, password } = this.state;
        if (password !== '' && email !== '') {
            login({email, password});
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
                        <button type="submit" className="btn btn-primary btn-block" onClick={this.doLogin}>
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
    // const
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
