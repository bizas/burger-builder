import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
   orders: [],
   loading: false,
   purchased: false,
   error: null
}

const purchaseBurgerSuccess = (state,action) => {
   const newOrder = updateObject(action.orderData,{id:action.orderId});
   return updateObject(state.orders,{
      loading: false,
      orders: state.orders.concat(newOrder),
      purchased: true
   });
};

const purchaseBurgerFail = (state,action) => {
   return updateObject(state,{
      loading: false,
      purchased: false,
      error: action.error
   });
};

const purchaseBurgerStart = (state,action) => {
   return updateObject(state,{loading: true});
};

const purchaseInit = (state,action) => {
   return updateObject(state,{purchased: false});
};

const fetchOrderStart = (state,action) => {
   return updateObject(state,{loading: true});
};

const fetchOrderSuccess = (state,action) => {
   return updateObject({
      loading: false,
      orders: action.orders});
};

const fetchOrderFail = (state,action) => {
   return updateObject(state,{
      loading: false,
      error: action.error});
};


const reducer = (state = initialState,action) => {
   switch (action.type) {
      case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);
      case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state,action);
      case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state,action);
      case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);
      case actionTypes.FETCH_ORDER_START: return fetchOrderStart(state,action);
      case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state,action);
      case actionTypes.FETCH_ORDER_FAIL: return fetchOrderFail(state,action);
      default: return state;
   }
}

export default reducer;