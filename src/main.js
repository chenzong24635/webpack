if(module && module.hot) {
  module.hot.accept()
}

import Vue from 'vue'
import App from './app'
// import 'css/base.less'
import {a,b} from './print.js'
a()
let name = 'tom'
console.log(1);
// console.log(`i am ${name}`);
// console.log(new Set([1]));
// console.log([0,3,...[1,2,4,3]]);
// console.log(new Promise((resolve) => {
//   console.log('resolve')
//   resolve(1);
// }));

new Vue({
  render: h => h(App)
}).$mount('#app')