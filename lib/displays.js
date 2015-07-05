(function () {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
};

var Display = Asteroids.Display = function(game){
  this.DIM_X = game.DIM_X;
  this.DIM_Y = game.DIM_Y;
  this.game = game;
};

})();
