/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const drawCircle = __webpack_require__(1)
const drawPoints = __webpack_require__(2)
const deleteOnePoint = __webpack_require__(4)
const renderPointsAtRight = __webpack_require__(5)
const startGame = __webpack_require__(6)

const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 500

// 设置背景圆的位置和半径
const circle = {x:250, y:250, radius:200}
const circleRight = {x:750, y:250, radius:200}
let arrPoints = [] // 保存随机生成的散点

drawCircle.draw(circle, context)
drawPoints.draw(10, context, arrPoints, circle)
deleteOnePoint.delete(arrPoints)

let imageDataTmp = context.getImageData(0, 0, canvas.width/2, canvas.height) // 保存左边画好的背景圆和散点
let startGameButton = document.querySelector('#startGame')
let stopGameButton = document.querySelector('#stopGame')
let rightCircleImg // 保存右侧去掉一点后的图像
window.saveInterval

startGameButton.onclick = function () {
  drawCircle.draw(circleRight, context);
  renderPointsAtRight.render(context, arrPoints);
  rightCircleImg = context.getImageData(500, 0, canvas.width, canvas.height);
  startGame.start(context, imageDataTmp, circle, rightCircleImg, circleRight);
  this.disabled = true;
  stopGameButton.disabled = false;
}

stopGameButton.onclick = function () {
  this.disabled = true;
  clearInterval(window.saveInterval);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.putImageData(imageDataTmp, 0, 0);
  context.putImageData(rightCircleImg, 500, 0);
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  draw({x, y, radius}, context) {
    context.beginPath()
    context.arc(x, y, radius, 0, 2*Math.PI)
    context.fillStyle = '#000'
    context.fill()
    context.closePath()
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const distanceBetween = __webpack_require__(3)

module.exports = {
  draw(num, context, arrPoints, {x, y, radius}) {
    // 新绘制的图形在已存在的图形上面
    context.globalCompositeOperation = 'source-over'

    while(arrPoints.length < num) {
      // 随机生成一个点，该点要在大圆的外接正方形范围内
      let obj = {
        x: Math.round( Math.random() * 2*radius + (x-radius) ),
        y: Math.round( Math.random() * 2*radius + (y-radius) ),
        r: 4
      }

      // 只有符合生成的点在圆内才放入数组中
      if (distanceBetween.distance(obj.x, obj.y, x, y)+obj.r < radius) {

        arrPoints.push(obj)

        // 从数组中删掉重叠的点
        for (let i = 0; i < arrPoints.length; i++) {
          for (let j = i + 1; j < arrPoints.length; j++) {
            if (distanceBetween.distance(arrPoints[i].x, arrPoints[i].y, arrPoints[j].x, arrPoints[j].y) <= obj.r*2) {
              arrPoints.pop()
            }
          }
        }
      }
    }

    for (let i = 0; i < num; i++) {
      context.beginPath()
      context.arc(arrPoints[i].x, arrPoints[i].y, arrPoints[i].r, 0, 2*Math.PI)
      context.fillStyle = '#fff'
      context.fill()
      context.closePath()
    }  
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  distance(x1, y1, x2, y2) {
    const x = Math.abs(x1 - x2)
    const y = Math.abs(y1 - y2)
    return Math.sqrt(x*x + y*y)
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  delete(arrPoints) {
    arrPoints.pop()
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
  render(context, arrPoints) {
    context.globalCompositeOperation = 'source-over';
    for (let i = 0; i < arrPoints.length; i++) {
      context.beginPath();
      context.arc(arrPoints[i].x+500, arrPoints[i].y, arrPoints[i].r, 0, 2*Math.PI);
      context.fillStyle = '#fff';
      context.fill();
      context.closePath();
    }    
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const drawNegativeSector = __webpack_require__(7)

module.exports = {
  start(context, imageDataTmp, circle, rightCircleImg, circleRight) {
    let start = 30
    let end = 0
    window.saveInterval = setInterval(() => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.putImageData(imageDataTmp, 0, 0)
      drawNegativeSector.draw(circle.x, circle.y, circle.radius, start, end, context)
      context.putImageData(rightCircleImg, 500, 0)
      drawNegativeSector.draw(circleRight.x, circleRight.y, circleRight.radius, start, end, context)
      start++
      end++
    }, 30)
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
  draw(x, y, r, s, e, context) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo( x+r*Math.cos(s*Math.PI/180), y+r*Math.sin(s*Math.PI/180) );
    context.arc(x, y, r, s*Math.PI/180, e*Math.PI/180);
    context.closePath();

    context.fillStyle = '#ccc';
    context.fill();
  }
}

/***/ })
/******/ ]);