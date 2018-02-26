import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Auth.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import {updateObject,checkValidity} from '../..//shared/utility';

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

   inputChangedHandler = (event,controlName) => {
      const updatedControls = updateObject(this.state.controls, {
         [controlName]: updateObject(this.state.controls[controlName],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
       })});
      
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

   componentDidMount() {
      if (!this.props.buildingBurger && this.props.authRedirectPath !== "/")
         this.props.onSetAuthRedirectPath();
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
         errorMessage = (<p style={{color: 'red'}}>{this.props.error.message}</p>);

      let authRedirect = null;
      if (this.props.isAuth) {
         authRedirect = <Redirect to={this.props.authRedirectPath} />
      }

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
            {authRedirect}
            {form}
         </div>
      );
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
      onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
   }
}

const mapStateToProps = (state) => {
   return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuth: state.auth.token !== null,
      buildingBurger: state.burgerBuilder.building,
      authRedirectPath: state.auth.authRedirectPath
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);