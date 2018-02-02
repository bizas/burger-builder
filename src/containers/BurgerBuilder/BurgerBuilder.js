import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandling/withErrorHandling';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
   constructor(props) {
      super(props)
      this.state = {
         purchasing: false,
         loading: false,
         error: false,
         ingredientPrices: null,
      }
   }

   componentDidMount() {
      let ingred = {};
      axios.get('/ingredients.json')
         .then(res => {
            ingred = res.data;
            this.setState({ingredients: res.data});
            this.updatePurchaseState(ingred);
         })
         .catch(error => {
            this.setState({error: true});
         });
      axios.get('/ingredientsPrices.json')
         .then(res => {
            this.setState({ingredientsPrices: res.data});
         })
         .catch(error => {
            this.setState({error: true});
         });
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
      this.setState({purchasing: true});
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
      let burger = this.state.error ? <p>Ingredients data could not be retrieved from the server.</p> : <Spinner />;
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
                  ordered={this.purchaseHandler}/>
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
      ingredients : state.ingredients,
      totalPrice : state.totalPrice
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
      onIngredientAdded: (ingredientName) => {
         console.log('mapDispatchToProps'," ",ingredientName);
         return dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingredientName
         });
      },
      onIngredientRemove: (ingredientName) => {
         return dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingredientName
         });
      }
   }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));