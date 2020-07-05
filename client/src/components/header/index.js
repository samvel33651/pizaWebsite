import React, { Component, Fragment }  from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import actions from "../../redux/user/actions";
import { userInfoSelector } from "../../redux/user/selectors";
import { withRouter } from "react-router-dom";

class Header extends Component {
    static propTypes = {
       userInfo: PropTypes.shape({
           userID: PropTypes.number,
           userName: PropTypes.string,
           email: PropTypes.string
       })
    }

    static defaultProps = {
        userInfo: {}
    }

    constructor(props) {
        super(props);
        this.onLogoutClicked = this.onLogoutClicked.bind(this);
    }

    onLogoutClicked(event) {
        event.preventDefault();
        const { logout, history } = this.props;
        logout();
        history.push('/');
    }

    render(){
        const { userInfo } = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="#">Start Bootstrap</a>
                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarResponsive" >
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>

                            {userInfo.get("id") ?
                                (
                                    <Fragment>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/cart">Cart</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/orders">Orders</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" >{userInfo.get("name")}</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" onClick={this.onLogoutClicked}>Logout</a>
                                        </li>
                                    </Fragment>
                                ) :
                                (
                                    <Fragment>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/login">Login</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/register"> Register</a>
                                        </li>
                                    </Fragment>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    const  userInfo = userInfoSelector(state);
    return {
        userInfo,
    }
}

const mapDispatchToProps = {
    logout: actions.logout,
}

export  default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
