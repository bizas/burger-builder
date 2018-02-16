import React from 'react';
import classes from './Order.css';

const getMonthString = (num) => {
   switch(num) {
      case 0: return "January";
      case 1: return "February";
      case 2: return "March";
      case 3: return "April";
      case 4: return "May";
      case 5: return "June";
      case 6: return "July";
      case 7: return "August";
      case 8: return "September";
      case 9: return "October";
      case 10: return "November";
      case 11: return "December";
      default: return "Invalid month";
   }
}
  
const getOrdinal = (num) => {
   const numStr = Number(num).toString();
   if (numStr === "NaN")
      return "";
   const lastNumStr = numStr.charAt(numStr.length-1);
   switch (lastNumStr) {
      case "1":
         return "st";
      case "2":
         return "nd";
      case "3":
         return "rd";
      default:
         return "th";
   }
}

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
         <strong>{ig.name}</strong> ({ig.amount})
         </span>;
   });
   let dateTimeStr = null;
   let date = new Date();
   try {
      date = new Date(props.date);
   } catch(E) {
      date = null;
   }
   if (date) { 
      const dateStr = date.getDate() + getOrdinal(date.getDate()) + " " + getMonthString(date.getMonth()) + " " + date.getFullYear();
      const timeStr = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      dateTimeStr = <p>Date: <strong>{dateStr + " " + timeStr}</strong></p>;
   }
   
   return (
      <div className={classes.Order}>
         <p>Ingredients: {ingredientOutput}</p>
         {dateTimeStr}
         <p>Price: <strong>${parseFloat(props.price).toFixed(2)}</strong></p>
      </div>
   );
}

export default order;