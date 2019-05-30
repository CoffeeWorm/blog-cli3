import axios from 'axios';
import message from '../components/message';

const cache = axios.create();
const success = res => {
  const { data, config } = res;
  const { method } = config;
  const { result, code, msg } = data;
  switch (true) {
    case code > 199 && code < 300:
      !new RegExp(method, 'i').test('get') && message.success('操作成功！');
      return result;
    case code > 299 && code < 400:
      break;
    case code > 399 && code < 500:
      return message.error(`[${code}]${msg}`);
    case code > 499 && code < 600:
      return message.error(`[${code}]${msg}`);
    default:
      return message.error('未知错误。');
  }
};
const failure = ({ response }) => {
  message.error('请求错误。');
  console.log(response);
  return Promise.reject(response);
};
cache.interceptors.response.use(success, failure);

export default cache;
