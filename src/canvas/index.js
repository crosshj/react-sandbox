(()=> {
  var id, d;
  function setCanvasPixel(context, {r=0, g=0, b=0, a=255}, {x=0, y=0}){
    id = id || context.createImageData(1,1); // only do this once per page
    d  = d || id.data;                        // only do this once per page
    d[0]   = r;
    d[1]   = g;
    d[2]   = b;
    d[3]   = a;
    context.putImageData( id, x, y );  
  }
  
  function newImageData(context, {x=1,y=1}){
    return context.createImageData(x, y);
  }
  
  var ad;
  function setImageDataPixel(imageData, {r=0, g=0, b=0, a=255}, {x=0, y=0}){
    ad = ad || imageData.data;
    
    d[x * y + 0]   = r;
    d[x * y + 1]   = g;
    d[x * y + 2]   = b;
    d[x * y + 3]   = a;
  }
  
  function range(from, to){
    return new Array(to).fill().map((a,b)=>b);
  }
  
  function randomInt(min, max) {
    return Math.floor(max - Math.random()*(max-min))
  }
  
  // TODO: better ways of doing this exist (not one pixel at a time)
  function randomPixel(setter){
    range(0, 640).forEach(x => {
      range(0, 480).forEach(y => {
        setter({
          r: randomInt(0,255),
          g: randomInt(0,255),
          b: randomInt(0,255)
        }, {x, y});
      });
    });
  }
  
  function ready(){
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    // boo, bad global
    window.setPixel = (color, pos) => setCanvasPixel(ctx, color, pos);
    window.range = range;
    
    var imageData = newImageData(ctx, {x:640, y:480});
    randomPixel((color, pos) => setImageDataPixel(imageData, color, pos));
    context.putImageData( imageData, 0, 0 );
  }
  document.addEventListener('DOMContentLoaded', ready, false);
})();
