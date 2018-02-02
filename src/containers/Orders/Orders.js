import React, {Component} from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

class Orders extends Component {

      state = {
            orders: [],
            loading: true,
            error: false
      };

      componentDidMount () {
            axios.get('/orders.json')
                  .then(res => {
                        const fechedOrders = [];
                        for (let key in res.data) {
                              fechedOrders.push({...res.data[key], id: key});
                        }
                        this.setState({orders: fechedOrders, loading: false});
                  })
                  .catch(error => {
                        this.setState({error: true, loading: false});
                  });
      }

      render ()  {
            const orders = this.state.orders.map((order) => {
                  return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            });

         return (
            <div>
                  {orders}
            </div>
         );
      };
}

export default withErrorHandling(Orders, axios);