(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {}
  }

var Background = Asteroids.Background = function(game) {
  this.game = game;
  this.stars = [];
  this.addStars();
  this.driftVec = Asteroids.Util.randomVec();
}

Background.NUM_STARS = 20;

Background.prototype.addStars = function () {
  for (var i = 0; i < Background.NUM_STARS; i++) {
    this.stars.push(new Asteroids.Star(this.game));
  }
}

Background.prototype.draw = function(ctx) {
  this.stars.forEach(function(star){
    star.draw(ctx);
  })
}

Background.prototype.drift = function (vec) {
  this.stars.forEach(function(star){
    star.drift([
      (this.driftVec[0] * 2 - vec[0]) /4,
      (this.driftVec[1] * 2 - vec[1]) /4
    ]);
  }.bind(this))
}

var Star = Asteroids.Star = function(game) {
  this.game = game;
  this.pos = game.randomPosition();
  this.zIndex = Math.random();
}

Star.color = '#ffff00';
Star.size = 2;

Star.prototype.draw = function(ctx) {
  ctx.fillstyle = Star.color;
  ctx.fillRect(this.pos[0], this.pos[1], Star.size * (1 + this.zIndex), Star.size * (1 + this.zIndex));
}

Star.prototype.drift = function(vec){
  var testX = this.pos[0] + vec[0] * this.zIndex;
  var testY = this.pos[1] + vec[1] * this.zIndex;
  this.pos = this.game.wrap([testX, testY], 2);
}


})();
