(function () {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
};

var Display = Asteroids.Display = function(game){
  this.DIM_X = game.DIM_X;
  this.DIM_Y = game.DIM_Y;
  this.game = game;
};

Display.prototype.expireAfter = function(ms) {
  window.setTimeout(function(){
    this.game.remove(this);
  }.bind(this), ms);

  return this;
}

Display.prototype.setDelay = function(ms){
  window.setTimeout(function(){
    this.game.displays.push(this);
  }.bind(this), ms);

  return this;
}

})();
