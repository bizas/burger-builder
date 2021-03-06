import React, {Component} from 'react';
import classes from '../../components/Order/CheckoutSummary/CheckoutSummary.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

   /* using query params 
   componentWillMount() { // prior to render the children (component did mount is after)
      const query = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      let price = 0;
      for (let param of query.entries()) {
         // param = ['salad','1'];
         if(param[0]==='price') {
            price = param[1];
            price = parseFloat(price).toFixed(2);
         } else {
            ingredients[param[0]] = Number(param[1]);
         }
      }
      this.setState({totalPrice: price, ingredients: ingredients});
   } */

   checkoutCancelledHandler = () => {
      this.props.history.goBack();
   };

   checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data');
   };

   render() {
      let summary = <Redirect to="/"/>
      if(this.props.ings) {
         const purchasedRedirect = this.props.purchased ? <Redirect to ="/"/> : null
         summary = (
            <div classes={classes.CheckoutSummary}>
               {purchasedRedirect}
               <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler}/>
               {/*<Route path={this.props.match.path + '/contact-data'} component={ContactData} />*/}
               <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
         );
      }
      return summary;
   }
}

const mapStateToProps = (state) => {
   return { 
      ings : state.burgerBuilder.ingredients,
      price : state.burgerBuilder.totalPrice,
      purchased: state.order.purchased
   }
};

export default connect(mapStateToProps)(Checkout);