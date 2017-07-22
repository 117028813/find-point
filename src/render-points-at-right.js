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