(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var LevelUp = Asteroids.LevelUp = function(game){
  this.level = game.NUM_ASTEROIDS;
  Asteroids.Display.call(this, game);
}

Asteroids.Util.inherits(Asteroids.LevelUp, Asteroids.Display);

LevelUp.prototype.draw = function(ctx) {
  ctx.fillStyle = "white";
  ctx.font = 96 + "pt Helvetica";
  ctx.fillText("Level Up!", 20, 150);
};


})();
