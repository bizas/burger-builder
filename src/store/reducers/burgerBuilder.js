import * as actionTypes from '../actions/actionTypes';

const initialState = {
   ingredients: null,
   ingredientPrices : null,
   totalPrice: 4,
   error: false
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGREDIENT :
         console.log(action)
         const obj = {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]: state.ingredients[action.ingredientName]+1
            },
            totalPrice: state.totalPrice + state.ingredientPrices[action.ingredientName]
         };
         console.log(obj)
         return obj;
      case actionTypes.REMOVE_INGREDIENT : 
         return {
            ...state,
            ingredients: {
               ...state.ingredients,
               [action.ingredientName]: state.ingredients[action.ingredientName]-1
            },
            totalPrice: state.totalPrice - state.ingredientPrices[action.ingredientName]
         };
      case actionTypes.SET_INGREDIENTS :
         return {
            ...state,
            ingredients: {
               tomato: action.ingredients.tomato,
               salad: action.ingredients.salad,
               bacon: action.ingredients.bacon,
               cheese: action.ingredients.cheese,
               meat: action.ingredients.meat
            },
            error: false,
            totalPrice: 4
         }
      case actionTypes.SET_INGREDIENT_PRICES :
         return {
            ...state,
            ingredientPrices: action.ingredientPrices,
            error: false
         }
      case actionTypes.FETCH_INGREDIENTS_FAILED :
         return {
            ...state,
            error: true
         }
      case actionTypes.FETCH_INGREDIENT_PRICES_FAILED :
         return {
            ...state,
            error: true
         }
      default:
         return state;
   }
};

export default reducer;
