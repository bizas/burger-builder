import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Auth.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component {

   state = {
      controls: {
         email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-Mail Address'
            },
            value: '',
            validation: {
                  required: true,
                  isEmail: true
            },
            valid: false,
            touched: false
         },
         password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                  required: true,
                  minLength: 6
            },
            valid: false,
            touched: false
         }
      },
      isSignup: true
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

      if (rules.isEmail) {
         if (value !== null) {
            const i =  value.indexOf("@");
            isValid = isValid && value.length-1 > i && i > 0;
         }
      }

      return isValid;
   }

   inputChangedHandler = (event,controlName) => {
      const updatedControls = {
            ...this.state.controls,
            [controlName]: {
               ...this.state.controls[controlName],
               value: event.target.value,
               valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
               touched: true
            }
      }
      
      let formIsValid = true;
      for (let controlKey in updatedControls) {
            formIsValid = formIsValid && updatedControls[controlKey].valid;
      }
      this.setState({controls: updatedControls, formIsValid: formIsValid});
   }

   submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
   }

   switchAuthModeHandler = () => {
      this.setState(prevState => {
         return {isSignup: !prevState.isSignup};
      })
   }

   render () {
      const formElementsArray = [];
      for (let key in this.state.controls) {
         formElementsArray.push(
            {
               id: key,
               config: this.state.controls[key]
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

      let errorMessage = null;

      if (this.props.error)
         errorMessage = (<p style={{color: 'red'}}>{this.props.error.message}</p>)

      let form = (
         <Auxiliary>
            <form onSubmit={this.submitHandler}>
               {errorMessage}
               {formElements}
               <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}</Button>
         </Auxiliary>);

      if (this.props.loading)
         form = <Spinner />;

      return (
         <div className={classes.Auth}>
            {form}
         </div>
      );
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup))
   }
}

const mapStateToProps = (state) => {
   return {
      loading: state.auth.loading,
      error: state.auth.error
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);