(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function(ctx, canvasEl){
    this.game = new Asteroids.Game(canvasEl, 1, this);
    this.ctx = ctx;
    this.startedGame = false;
    this.bindKeys();
  };

  GameView.prototype.start = function() {
    this.interval = window.setInterval(this.game.render.bind(this.game, this.ctx), 20);
  };


  GameView.prototype.bindKeys = function(){
    $(document).on("keydown", function(event){
      if (event.keyCode === 80) {
        if (this.game.isOver) {
          this.game.isOver = false;
          this.game.restart();
        } else if (this.game.paused) {
          if (!this.startedGame){
            this.startedGame = true;
            this.game.start();
          }
          this.game.paused = false;
        } else {
          this.game.paused = true;
        }
      };

      this.unbindUsedKeys(event);
    }.bind(this));
  }

  GameView.prototype.unbindUsedKeys = function(event) {
    if ([65, 83, 68, 37, 40, 80, 32, 38, 39, 87].indexOf(event.keyCode) !== -1) {
      event.preventDefault();
    }
  }

  })();
