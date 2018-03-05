import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandling/withErrorHandling';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
   constructor(props) {
      super(props)
      this.state = {
         purchasing: false,
      }
   }

   componentDidMount () {
      this.props.onInitIngredients();
      this.props.onInitIngredientPrices();
   }

/*    addIngredientHandler = (type) => {
      const oldCount = this.props.ingredients[type];
      const updatedCount = oldCount+1;
      const updatedIngredients = {
         ...this.props.ingredients
      }
      updatedIngredients[type] = updatedCount;
      const priceAddition = this.props.ingredientsPrices[type];
      const oldPrice = this.props.totalPrice;
      const newPrice = oldPrice + priceAddition;

      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
   };

   removeIngredientHandler = (type) => {
      const oldCount = this.props.ingredients[type];
      if (oldCount <= 0)
         return;

      const updatedCount = oldCount-1;
      const updatedIngredients = {
         ...this.props.ingredients
      }
      updatedIngredients[type] = updatedCount;
      const priceDeduction = this.props.ingredientsPrices[type];
      const oldPrice = this.props.totalPrice;
      const newPrice = oldPrice - priceDeduction;

      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
   }; */

   updatePurchaseState = () => {
      const ingredients = this.props.ingredients;
      if (ingredients == null)
         return;
      const sum = Object.keys(ingredients).map((igKey) => {
         return ingredients[igKey];
      }).reduce((sum, el) => {
         return sum + el;
      });

      return sum > 0;
   }

   purchaseHandler = () => {
      if (this.props.isAuth) {
         this.setState({purchasing: true});
      } else {
         this.props.onSetAuthRedirectPath('/checkout');
         this.props.history.push("/auth");
      }
   }

   purchaseCancelHandler = () => {
      this.setState({purchasing: false});
      
   }

/*    Using Query params
      purchaseContinueHandler = () => {
      const queryParams = [];
      for (let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ingredients[i]));
      }
      queryParams.push('price=' + this.props.totalPrice);
      const queryString = queryParams.join('&');
      this.props.history.push({
            pathname: "/checkout",
            search: '?'+queryString
      });
   } */
   purchaseContinueHandler = () => {
      this.props.onInitPurchase();
      this.props.history.push("/checkout");
   }   
   
   
   render() {
      const disabledInfo = {
         ...this.props.ingredients
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }

      let orderSummary = null;
      let burger = this.props.error ? <p>Ingredients data could not be retrieved from the server.</p> : <Spinner />;
      if(this.props.ingredients) {
         burger = (
            <Aux>
               <Burger ingredients={this.props.ingredients} />
               <BuildControls 
                  ingredientAdded={this.props.onIngredientAdded}
                  ingredientRemoved={this.props.onIngredientRemove}
                  disabled={disabledInfo}
                  price={this.props.totalPrice}
                  purchasable={this.updatePurchaseState()}
                  ordered={this.purchaseHandler}
                  isAuth={this.props.isAuth}/>
            </Aux>);
         orderSummary = (<OrderSummary 
            ingredients={this.props.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.totalPrice}
         />);
      }

      if(this.state.loading) {
         orderSummary = <Spinner />
      }

      return (
         <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
               {orderSummary}
            </Modal>
            {burger}
         </Aux>
      );
   }
}

const mapStateToProps = (state) => {
   return { 
      ingredients : state.burgerBuilder.ingredients,
      totalPrice : state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
      isAuth: state.auth.token !== null
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
      onIngredientAdded: (ingredientName) => {
         return dispatch(actions.addIngredient(ingredientName));
      },
      onIngredientRemove: (ingredientName) => {
         return dispatch(actions.removeIngredient(ingredientName));
      },
      onInitIngredients: () => {
         return dispatch(actions.initIngredients());
      },
      onInitIngredientPrices: () => {
         return dispatch(actions.initIngredientPrices());
      },
      onInitPurchase: () => {
         return dispatch(actions.purchaseInit());
      },
      onSetAuthRedirectPath: (path) => {
         return dispatch(actions.setAuthRedirectPath(path));
      }
   }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));