import Vue from 'vue'
import App from './app'

let name = 'tom'
console.log(`i am ${name}`);
// console.log(new Set([1]));
console.log([0,3,...[1,2,4,3]]);


new Vue({
  render: h => h(App)
}).$mount('#app')