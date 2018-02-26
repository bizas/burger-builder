import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
   ingredients: null,
   ingredientPrices : null,
   totalPrice: 4,
   error: false,
   building: false
};

const addIngredient = (state,action) => {
   const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName]+1}
   const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
   const updatedState = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + state.ingredientPrices[action.ingredientName],
      building: true
   };
   return updateObject(state,updatedState);
};

const removeIngredient = (state,action) => {
   const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName]-1}
   const updatedIngs = updateObject(state.ingredients, updatedIng);
   const updatedSt = {
      ingredients: updatedIngs,
      totalPrice: state.totalPrice - state.ingredientPrices[action.ingredientName],
      building: true
   };
   return updateObject(state,updatedSt);
};

const setIngredients = (state,action) => {
   return updateObject(state, {
      ingredients: {
         tomato: action.ingredients.tomato,
         salad: action.ingredients.salad,
         bacon: action.ingredients.bacon,
         cheese: action.ingredients.cheese,
         meat: action.ingredients.meat
      },
      error: false,
      totalPrice: 4,
      building: false
   });
};

const setIngredientPrices = (state,action) => {
   return updateObject(state,{
      ingredientPrices: action.ingredientPrices,
      error: false});
};


const fetchIngredientsFailed = (state,action) => {
   return updateObject(state,{error: true});
};

const fetchIngredientPricesFailed = (state,action) => {
   return updateObject(state,{error: true}); 
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
      case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
      case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);
      case actionTypes.SET_INGREDIENT_PRICES: return setIngredientPrices(state,action);
      case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action);
      case actionTypes.FETCH_INGREDIENT_PRICES_FAILED: return fetchIngredientPricesFailed(state,action);
      default:
         return state;
   }
};

export default reducer;
