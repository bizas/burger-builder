import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'
import { Switch, Route, Redirect} from 'react-router-dom';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/burger-builder" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Redirect from="/" to="/burger-builder" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
