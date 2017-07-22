module.exports = {
  draw(circleObj, context) {
    context.beginPath()
    context.arc(circleObj.x, circleObj.y, circleObj.radius, 0, 2*Math.PI)
    context.fillStyle = '#000'
    context.fill()
    context.closePath()
  }
}