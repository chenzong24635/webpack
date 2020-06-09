import _ from 'lodash';
import './index.css';
import './index1.css';
import printMe from './print.js';
import moto from'./address.svg';

function component() {
  var ele = document.createElement('div');
  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
  ele.innerHTML = _.join(['Hello', 'webpack'], ' ');
  ele.classList.add('red', 'bgc-black');

  // let motoImg = new Image();
  // motoImg.src= moto
  // ele.appendChild(motoImg)
  // cs

  return ele;
}
document.body.appendChild(component());
// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepting the updated printMe module!');
//     printMe();
//   })
// }