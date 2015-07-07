(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };
  var Bullet = Asteroids.Bullet = function (obj) {
    Asteroids.MovingObject.call(this, {
      game: obj.game,
      radius: Bullet.RADIUS,
      pos: obj.pos,
      vel: obj.vel,
      magnitude: Bullet.bulletSpeed
    })
  };
  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

  Bullet.RADIUS = 7;

  Bullet.bulletSpeed = 10;

  Bullet.prototype.draw = function(ctx){
    ctx.fillStyle = '#ffff7f';
    var side = this.radius * Math.sqrt(2);
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(Asteroids.Util.findAngle(this.vel, [0,0], 0));
    ctx.fillRect( side / -2, side / -2, side - 1, side - 1);
    ctx.restore();
  };

  Bullet.prototype.handleCollision = function(obj){
    if (obj instanceof Asteroids.Asteroid) {
      this.game.remove(this);
    };
  }

})();
