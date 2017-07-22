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