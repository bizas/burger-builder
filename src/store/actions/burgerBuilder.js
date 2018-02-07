import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
   return {
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: name
   }
};

export const removeIngredient = (name) => {
   return {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: name
   }
};

const setIngredients = (ingredients) => {
   return {
      type: actionTypes.SET_INGREDIENTS,
      ingredients: ingredients
   }
}

const setIngredientPrices = (ingredientPrices) => {
   return {
      type: actionTypes.SET_INGREDIENT_PRICES,
      ingredientPrices: ingredientPrices
   }
}

export const fetchIngredientsFailed = () => {
   return {type: actionTypes.FETCH_INGREDIENTS_FAILED}
}

export const fetchIngredientPricesFailed = () => {
   return {type: actionTypes.FETCH_INGREDIENT_PRICES_FAILED}
}



export const initIngredients = () => {
   return dispatch => {
      console.log("initIngredients")
      axios.get('/ingredients.json')
         .then(res => {
            console.log("DATA:")
            console.log(res.data)
            dispatch(setIngredients(res.data))
         })
         .catch(error => {
            console.log("ERROR:")
            console.log(error)
            dispatch(fetchIngredientsFailed())
         });
   }
}

export const initIngredientPrices = () => {
   return dispatch => {
      axios.get('/ingredientsPrices.json')
         .then(res => {
            dispatch(setIngredientPrices(res.data))
         })
         .catch(error => {
            dispatch(fetchIngredientPricesFailed())
         });
   }
}