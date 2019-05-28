import axios from 'axios';

const cache = axios.create();
const success = ({ result, msg, code }) => {
  switch (true) {
    case code > 199 && code < 300:
      return result;
    case code > 299 && code < 400:
      break;
    case code > 399 && code < 500:
      break;
    case code > 499 && code < 600:
      break;
    default:
      break;
  }
};
const failure = ({ response }) => {
  console.log(response);
};
cache.interceptors.response.use(success, failure);

export default cache;
