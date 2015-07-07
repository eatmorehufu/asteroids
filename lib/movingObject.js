(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

var MovingObject = Asteroids.MovingObject = function (obj) {
  this.pos = obj.pos;
  this.vel = obj.vel;
  this.magnitude = obj.magnitude;
  this.radius = obj.radius;
  this.game = obj.game;
};

MovingObject.prototype.move = function () {
  var newX = this.pos[0] + (this.vel[0] * this.magnitude);
  var newY = this.pos[1] + (this.vel[1] * this.magnitude);
  if (this instanceof Asteroids.Asteroid) {
    this.pos = this.game.wrap([newX, newY], this.radius);
  } else if (this instanceof Asteroids.Ship) {
    this.pos = this.game.bounce([newX, newY], this.radius);
  } else if (this instanceof Asteroids.Bullet) {
    if (
      this.pos[0] > this.game.DIM_X ||
      this.pos[1] > this.game.DIM_Y ||
      this.pos[0] < 0 ||
      this.pos[1] < 0
    ){
      this.game.remove(this);
    } else {
      this.pos = [newX, newY];
    };
  };
}

MovingObject.prototype.isCollidedWith = function(otherObject){
  var disX = Math.abs(this.pos[0] - otherObject.pos[0]);
  var disY = Math.abs(this.pos[1] - otherObject.pos[1]);
  var sumRad = this.radius + otherObject.radius;
  return ((sumRad * sumRad) > ((disX * disX) + (disY * disY)));
};

})();
