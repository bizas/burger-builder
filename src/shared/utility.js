export const updateObject = (oldObject,updatedProperties) => {
   return {
      ...oldObject,
      ...updatedProperties
   };
};

export const checkValidity = (value,rules) => {
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