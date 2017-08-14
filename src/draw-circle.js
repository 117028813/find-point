module.exports = {
  draw({x, y, radius}, context) {
    context.beginPath()
    context.arc(x, y, radius, 0, 2*Math.PI)
    context.fillStyle = '#000'
    context.fill()
    context.closePath()
  }
}