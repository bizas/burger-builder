import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';

class ContactData extends Component {
   state = {
      orderForm: {
         name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                  required: true
            },
            valid: false,
            touched: false
         },
         street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                  required: true
            },
            valid: false,
            touched: false
         },
         zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: '',
            validation: {
                  required: true,
                  minLength: 5,
                  maxLength: 5
            },
            valid: false,
            touched: false
         },
         country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                  required: true
            },
            valid: false,
            touched: false
         },
         email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                  required: true
            },
            valid: false,
            touched: false
         },
         deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                  {
                        value: 'fastest',
                        displayValue: 'Fastest'
                  },
                  {
                        value: 'cheapest',
                        displayValue: 'Cheapest'
                  }]
            },
            value: 'cheapest',
            validation: {},
            valid: true,
            touched: false
         },
      },
      loading: false,
      formIsValid: false
      }

   orderHandler = (event) => {
      event.preventDefault();
      alert('You continue!');
      this.setState({loading: true});
      const formData = {};
      for (let formElementID in this.state.orderForm) {
            formData[formElementID] = this.state.orderForm[formElementID].value;
      }
      const date = new Date();
      const order = {
         date: date.toDateString() + " " + date.toTimeString(),
         ingredients: this.props.ings,
         price: this.props.price,
         orderData: formData
      }
      axios.post('/orders.json',order)
         .then(response => {
            //console.log(response);
            this.setState({loading: false, purchasing: false});
            this.props.history.push('/');
         })
         .catch(error => {
            this.setState({loading: false, purchasing: false});
         });
      
   }

   checkValidity = (value,rules) => {
      let isValid = true;

      if(!rules) {
            return true;
      }
      
      if (rules.required) {
            isValid = isValid && value.trim() !== '';
      }

      if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength;
      }

      if (rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength;
      }

      return isValid;
   }

   inputChangedHandler = (event,inputIdentifier) => {
      const updatedOrderForm = {
            ...this.state.orderForm
      }
      const updatedOrderFormElement = {
            ...updatedOrderForm[inputIdentifier]
      }
      updatedOrderFormElement.value = event.target.value;
      updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value,updatedOrderFormElement.validation);
      updatedOrderFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
      
      let formIsValid = true;
      for (let inputIdentifiers in updatedOrderForm) {
            formIsValid = formIsValid && updatedOrderForm[inputIdentifiers].valid;
      }
      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
   }

   render() {
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
            formElementsArray.push(
                  {
                        id: key,
                        config: this.state.orderForm[key]
                  }
            );
      }
      const formElements = formElementsArray.map((formElement)=>{
            return (
                  <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValitate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}
                  />
            );
      });
      let form = (
         <form onSubmit={this.orderHandler} >
            {formElements}
            <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
         </form>
      );
      if (this.state.loading) {
         form = <Spinner />
      }
      return (
         <div className={classes.ContactData}>
            <h4>Enter your contact data.</h4>
            {form}
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return { 
      ings : state.ingredients,
      price : state.totalPrice
   }
};

export default connect(mapStateToProps)(ContactData);