import React, { Component, Fragment } from 'react';
import Header from './components/header';
import { connect } from 'react-redux';
import actions from './redux/user/actions';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Orders from "./components/orders";
import Products from './components/products'
import Login from './components/login';
import Footer from './components/footer';
import Register from './components/register';
import './App.css';

class App extends Component {
    componentDidMount() {
        const { appStarted, appStart } = this.props;
        if(!appStarted) {
            appStart();
        }
        // const { getProducts } = this.props;
        // getProducts();
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <Header />
                    <div className=" content container pt-3">
                        <Route path="/" exact component={Products} />
                        <Route path="/login"  exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/orders" exact component={Orders} />
                    </div>
                    <Footer />
                </Router>
            </Fragment>

        );
    }
}

const  mapStateToProps = (state) => {
    const { userData } = state;
    const appStarted = userData.get("appStarted");
    const userInfo = userData.get("userInfo");
    return {
        appStarted,
        userInfo
    }
}

const mapDispatchToProps = {
    appStart: actions.appStart,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
