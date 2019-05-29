import Vue from 'vue';
import Message from './message';

const Msg = Vue.extend(Message);
const types = ['info', 'warn', 'success', 'error'];

export default function msg(type, message = '', timer = 3 * 1000) {
  const messager = new Msg({
    propsData: {
      type,
      message,
      timer
    }
  });
  messager.$mount();
  document.body.appendChild(messager.$el);
}

types.forEach(type => {
  msg[type] = (message = '', timer = 3 * 1000) => {
    msg(type, message, timer);
  };
});
