(function () {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
};

var Explosion = Asteroids.Explosion = function(game) {
  Asteroids.Display.call(this, game);
}

Explosion.image = new Image();
Explosion.frameSize = 36;
Explosion.frameRow = 216;
Explosion.image.src = './assets/explosion.png';

Explosion.prototype.setExplosion = function(pos, radius) {
  this.pos = pos;
  this.radius = radius;
  this.animFrame = [0, 0];
  console.log(this.animFrame);
  return this;
}

Explosion.prototype.draw = function(ctx) {
  console.log("Explosion.image");
  console.log(this.animFrame);
  ctx.drawImage(
    Explosion.image,
    this.animFrame[0],
    this.animFrame[1],
    Explosion.frameSize,
    Explosion.frameSize,
    this.pos[0] - this.radius,
    this.pos[1] - this.radius,
    this.radius * 2,
    this.radius * 2
  );
  if (this.animFrame[0] === Explosion.frameRow - Explosion.frameSize) {
    this.animFrame[1] += Explosion.frameSize;
  }
  this.animFrame[0] = (this.animFrame [0]+ Explosion.frameSize) % Explosion.frameRow;
  console.log("animating explosion");
  if (this.animFrame[1] >= Explosion.frameSize * 3) {
    this.game.displays.splice(this.game.displays.indexOf(this), 1);
    console.log(this.game.displays);
  }
}


})();
