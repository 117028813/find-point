const drawNegativeSector = require('./draw-negative-sector')

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