(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {}
  };

var HuD = Asteroids.HuD = function(game){
  Asteroids.Display.call(this, game);
};

Asteroids.Util.inherits(Asteroids.HuD, Asteroids.Display);
HuD.pauseImage = new Image();
HuD.pauseImage.src = "./assets/pause_screen.png"

HuD.prototype.draw = function (ctx) {
  ctx.fillStyle = "white";
  ctx.font = 10 + "pt 'Press Start 2P'";
  ctx.fillText("Shields left: " + this.game.ship.shields +"%", 20, 20);
  ctx.fillText("Wave " + (this.game.NUM_ASTEROIDS - 3), this.DIM_X - 100, 20);

  if (this.game.isOver) {
    ctx.font = 30 + "pt 'Press Start 2P'";
    ctx.fillText("GAME OVER", 512 - 180, 150);
    ctx.font = 10 + "pt 'Press Start 2P'";
    ctx.fillText("Press 'P' to Restart", 512 - 135, 200);
  };
};

HuD.renderPause = function(ctx) {
  ctx.drawImage(HuD.pauseImage, 112, 50);
}

})();
