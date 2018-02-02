import axios from 'axios';

const instance = axios.create({
   baseURL: "https://react-my-burger-62d4b.firebaseio.com/"
});


export default instance;
