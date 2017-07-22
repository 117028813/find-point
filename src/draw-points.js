const distanceBetween = require('./distance-between')

module.exports = {
  draw(num, context, arrPoints, circle) {
    // 新绘制的图形在已存在的图形上面
    context.globalCompositeOperation = 'source-over'

    while(arrPoints.length < num) {
      // 随机生成一个点，该点要在大圆的外接正方形范围内
      let obj = {
        x: Math.round( Math.random() * 2*circle.radius + (circle.x-circle.radius) ),
        y: Math.round( Math.random() * 2*circle.radius + (circle.y-circle.radius) ),
        r: 4
      }

      // 只有符合生成的点在圆内才放入数组中
      if (distanceBetween.distance(obj.x, obj.y, circle.x, circle.y)+obj.r < circle.radius) {

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