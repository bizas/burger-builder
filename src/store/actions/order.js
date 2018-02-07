import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id,orderData) => {
   return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderId: id,
      orderData: orderData
   };
};

export const purchaseBurgerFail = (error) => {
   return {
      type: actionTypes.PURCHASE_BURGER_FAIL,
      error: error
   };
};

export const purchaseBurgerStart = () => {
   return {
      type: actionTypes.PURCHASE_BURGER_START
   }
};

export const purchaseBurger = (order) => {
   return dispatch => {
      console.log("START")
      dispatch(purchaseBurgerStart())
      axios.post('/orders.json',order)
         .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, order));
         })
         .catch(error => {
            console.log("ERROR: " + error)
            dispatch(purchaseBurgerFail(error));
         });
   };
};

export const purchaseInit = () => {
   return {
      type: actionTypes.PURCHASE_INIT
   };
};

export const fetchOrdersSuccess = (orders) => {
   return {
      type: actionTypes.FETCH_ORDER_SUCCESS,
      orders: orders
   };
};

export const fetchOrdersFail = (error) => {
   return {
      type: actionTypes.FETCH_ORDER_FAIL,
      orders: error
   };
};

export const fetchOrdersStart = () => {
   return {
      type: actionTypes.FETCH_ORDER_START
   }
};

export const fetchOrders = () => {
   return dispatch => {
      dispatch(fetchOrdersStart());
      axios.get('/orders.json')
      .then(res => {
            const fechedOrders = [];
            for (let key in res.data) {
                  fechedOrders.push({...res.data[key], id: key});
            }
            dispatch(fetchOrdersSuccess(fechedOrders));
      })
      .catch(error => {
         dispatch(fetchOrdersFail(error));
      });
   };
}