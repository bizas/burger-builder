import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders'
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
   return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
   return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
   return import('./containers/Auth/Auth');
});

class App extends Component {

   componentDidMount () {
      this.props.onTryAutoSignup();
   }
  render() {

   let routes = (<Switch>
                     <Route path="/burger-builder" exact component={BurgerBuilder} />
                     <Route path="/auth" component={asyncAuth} />
                     <Redirect to="/burger-builder" />
                  </Switch>);

   if (this.props.isAuthenticated ) {
      routes = (<Switch>
                  <Route path="/burger-builder" exact component={BurgerBuilder} />
                  <Route path="/checkout" component={asyncCheckout} />
                  <Route path="/orders" component={asyncOrders} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/auth" component={asyncAuth} />
                  <Redirect to="/burger-builder" />
               </Switch>);
   }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onTryAutoSignup: () => {return dispatch(actions.authCheckState());}
   }
}

const mapStateToProps = (state) => {
   return {
      isAuthenticated: state.auth.token !== null
   }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
