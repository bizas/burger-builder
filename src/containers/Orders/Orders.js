import React, {Component} from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
      componentDidMount () {
         this.props.onFetchOrders();
      }

      render ()  {
         let orders = <Spinner />;
         if(!this.props.loading) {
            orders = this.props.orders.map((order) => {
               return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            });
         }

         return (
            <div>
                  {orders}
            </div>
         );
      };
}

const mapStateToProps = (state) => {
   return {
      orders: state.order.orders,
      loading: state.order.loading
   }
};
const mapdispatchToProps = (dispatch) => {
   return {
      onFetchOrders: () => {
         return dispatch(actions.fetchOrders());
      }
   }
};

export default connect(mapStateToProps,mapdispatchToProps)(withErrorHandling(Orders, axios));