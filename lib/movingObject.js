(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

var MovingObject = Asteroids.MovingObject = function (obj) {
  this.pos = obj.pos;
  this.vel = obj.vel;
  this.magnitude = obj.magnitude;
  this.radius = obj.radius;
  this.color = obj.color;
  this.game = obj.game;
};


MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2*Math.PI,
    false
  );

  ctx.fill();

};

MovingObject.prototype.move = function () {
  var newX = this.pos[0] + (this.vel[0] * this.magnitude);
  var newY = this.pos[1] + (this.vel[1] * this.magnitude);

  this.pos = this.game.wrap([newX, newY], this.radius);
}

MovingObject.prototype.isCollidedWith = function(otherObject){
  var disX = Math.abs(this.pos[0] - otherObject.pos[0]);
  var disY = Math.abs(this.pos[1] - otherObject.pos[1]);
  var sumRad = this.radius + otherObject.radius;
  return ((sumRad * sumRad) > ((disX * disX) + (disY * disY)));
};

})();
