if(module && module.hot) {
  module.hot.accept()
}

import Vue from 'vue'
import App from './app'
// import 'css/base.less'
// import {a,b} from './print.js'
// a()
console.log(1);
(async function (){
  await console.log('asycn_await1');
  console.log(0);
})()
console.log(2);
new Vue({
  render: h => h(App)
}).$mount('#app')