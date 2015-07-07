(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };
  var Bullet = Asteroids.Bullet = function (obj) {
    var RADIUS = 5;
    var COLOR = "#00F";
    Asteroids.MovingObject.call(this, {
      game: obj.game,
      radius: RADIUS,
      color: COLOR,
      pos: obj.pos,
      vel: obj.vel,
      magnitude: Bullet.bulletSpeed
    })
  };

Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

Bullet.bulletSpeed = 10;

Bullet.prototype.handleCollision = function(obj){
  if (obj instanceof Asteroids.Asteroid) {
    this.game.remove(this);
  };
}

})();
