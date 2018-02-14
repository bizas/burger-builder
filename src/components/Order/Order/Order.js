import React from 'react';
import classes from './Order.css';

const order = (props) => {
   /*const ingred = Object.keys(props.ingredients)
   .map((igKey)=> {
      return (igKey+"("+props.ingredients[igKey]+")");
   })
   .reduce((str, el) => {
      return (str+=el);
   });*/
   const ingred = [];
   for (let ingredientsName in props.ingredients) {
      ingred.push({name: ingredientsName, amount: props.ingredients[ingredientsName]});
   }

   const ingredientOutput = ingred.map(ig => {
      return <span key={ig.name} style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}} >
         {ig.name} ({ig.amount})
         </span>;
   })
   return (
      <div className={classes.Order}>
         <p>Ingredients: {ingredientOutput}</p>
         <p>Price: <strong>${parseFloat(props.price).toFixed(2)}</strong></p>
      </div>
   );
}

export default order;