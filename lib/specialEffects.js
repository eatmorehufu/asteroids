(function () {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
};

var Explosion = Asteroids.Explosion = function(game) {
  Asteroids.Display.call(this, game);
}

Explosion.sprite = new Image();
Explosion.frameSize = 36;
Explosion.frameRow = 216;
Explosion.sprite.src = './assets/explosion.png';

Asteroids.Util.inherits(Asteroids.Explosion, Asteroids.Display)

Explosion.prototype.setExplosion = function(pos, radius) {
  this.pos = pos;
  this.radius = radius;
  this.animFrame = [0, 0];
  return this;
}

Explosion.prototype.draw = function(ctx) {
  ctx.drawImage(
    Explosion.sprite,
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
  if (this.animFrame[1] >= Explosion.frameSize * 3) {
    this.game.remove(this);
  }
}

var InvincibilityShield = Asteroids.InvincibilityShield = function(game){
  this.ship = game.ship;
  this.animTimer = 0;
  Asteroids.Display.call(this, game);
}
InvincibilityShield.sprite = new Image();
InvincibilityShield.dimension = 100;
InvincibilityShield.sprite.src = "./assets/invinciblebubble.png";

Asteroids.Util.inherits(Asteroids.InvincibilityShield, Asteroids.Display);

InvincibilityShield.prototype.draw = function(ctx) {
  if (this.animTimer < 2){
    ctx.globalAlpha = 0.3;
    ctx.drawImage(
      InvincibilityShield.sprite,
      0,
      0,
      InvincibilityShield.dimension,
      InvincibilityShield.dimension,
      this.ship.pos[0] - InvincibilityShield.dimension / 2,
      this.ship.pos[1] - InvincibilityShield.dimension / 2,
      InvincibilityShield.dimension,
      InvincibilityShield.dimension
    )
  ctx.globalAlpha = 1;
  }
  this.animTimer = (this.animTimer + 1) % 4;
}

})();
