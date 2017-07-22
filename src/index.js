const drawCircle = require('./draw-circle')
const drawPoints = require('./draw-points')
const deleteOnePoint = require('./delete-one-point')
const renderPointsAtRight = require('./render-points-at-right')
const startGame = require('./start-game')

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