(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function(ctx, canvasEl){
    this.game = new Asteroids.Game(canvasEl, 1, this);
    this.ctx = ctx;
    this.bindPause();
  };

  GameView.prototype.start = function() {
    this.interval = window.setInterval(this.game.render.bind(this.game, this.ctx), 20);
  };

  GameView.prototype.bindPause = function(){
    $(document).on("keydown", function(event){
      if (event.keyCode === 80) {
        if (this.game.isOver) {
          this.game.isOver = false;
          this.game.restart();
        };
      };
    }.bind(this));
  }

  })();
