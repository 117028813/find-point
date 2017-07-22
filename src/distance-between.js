module.exports = {
  distance(x1, y1, x2, y2) {
    const x = Math.abs(x1 - x2)
    const y = Math.abs(y1 - y2)
    return Math.sqrt(x*x + y*y)
  }
}