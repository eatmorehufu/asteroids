(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Game = Asteroids.Game = function(canvasEl, level, gameView) {
  this.DIM_X = canvasEl.width;
  this.DIM_Y = canvasEl.height;
  this.gameView = gameView;
  this.NUM_ASTEROIDS = Game.SEED_ASTEROIDS + level;
  this.paused = true;
};

Game.SEED_ASTEROIDS = 3;


Game.prototype.addAsteroids = function() {
  this.asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++ ){
    this.asteroids.push(new Asteroids.Asteroid({
      pos: this.randomPosition(),
      game: this
    }).growIn());
  };
};

Game.prototype.randomPosition = function() {
  return [(Math.random() * this.DIM_X), (Math.random() * this.DIM_Y)];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.background.draw(ctx);
  this.allObjects().forEach(function(piece) {
    piece.draw(ctx);
  });
  this.drawDisplays(ctx);
};

Game.prototype.moveObjects = function(){
  this.allObjects().forEach(function(piece) {
    piece.move();
  });
};

Game.prototype.render = function(ctx){
  if (this.paused) {
    Asteroids.HuD.renderPause(ctx);
  } else {
    this.step();
    this.draw(ctx);
  }
};

Game.prototype.drawDisplays = function(ctx){
  this.displays.forEach(function(display){
    display.draw(ctx);
  })
};

Game.prototype.getMovement = function() {
  var game = this;
  var thrust = 2;
  if (key.isPressed('w') && !key.isPressed('s')) {
    game.ship.power([0, thrust * -1]);
  };
  if (key.isPressed('s') && !key.isPressed('w')) {
    game.ship.power([0, thrust]);
  };
  if (key.isPressed('a') && !key.isPressed('d')) {
    game.ship.power([-1 * thrust, 0]);
  };
  if (key.isPressed('d') && !key.isPressed('a')) {
    game.ship.power([thrust, 0]);
  };
};

Game.prototype.getShooting = function() {
  var shootVector = [0,0]
  var game = this;
  if (!game.firedBullet) {
    if (key.isPressed('left')) {
      shootVector[0] -= 1;
    };
    if (key.isPressed('up')) {
      shootVector[1] -= 1;
    };
    if (key.isPressed('down')) {
      shootVector[1] += 1;
    };
    if (key.isPressed('right')) {
      shootVector[0] += 1;
    };
    if (shootVector[0] !== 0 || shootVector[1] !== 0) {
      game.firedBullet = true;
      this.ship.fireBullet(shootVector);
      window.setTimeout(function(){
        game.firedBullet = false
      }, 300);
    };
  };
};


Game.prototype.wrap = function(pos, radius) {
  var wrapX = pos[0];
  var wrapY = pos[1];
  if(wrapX - radius > this.DIM_X){
    wrapX -= (this.DIM_X + 2 * radius);
  };
  if(wrapX + radius < 0) {
    wrapX += this.DIM_X + 2*radius;
  };
  if(wrapY - radius > this.DIM_Y){
    wrapY -= (this.DIM_Y + 2 * radius);
  };
  if(wrapY + radius < 0){
    wrapY += this.DIM_Y + 2 * radius;
  };
  return [wrapX, wrapY]
};

Game.prototype.bounce = function(pos, radius){
  var bounceX = pos[0];
  var bounceY = pos[1];
  if (bounceX + radius > this.DIM_X){
    bounceX = this.DIM_X - radius;
  }
  if (bounceY + radius > this.DIM_Y) {
    bounceY = this.DIM_Y - radius;
  }
  if (bounceX - radius < 0) {
    bounceX = radius;
  }
  if (bounceY - radius < 0) {
    bounceY = radius;
  }
  return [bounceX, bounceY];
}

Game.prototype.checkCollisions = function() {
  var allObjs = this.allObjects();
  for (var i = 0; i < allObjs.length; i++ ) {
    for (var j = 0; j < allObjs.length; j++) {
      if (i === j) {
        continue;
      }
      if (allObjs[i].isCollidedWith(allObjs[j])) {
        allObjs[i].handleCollision(allObjs[j]);
      };
    };
  };
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
  if (!this.ship.frozen) {
    this.getMovement();
    this.getShooting();
  };
  this.ship.addFriction();
  if (!this.newWaveTimer){
    this.background.drift(this.ship.vel);
  } else {
    this.background.drift(this.levelUpVector);
    this.levelUpVector = [this.levelUpVector[0] * 0.95, this.levelUpVector[1] * 0.95];
  }
};

Game.prototype.remove = function(obj) {
  var game = this;
  if(obj instanceof Asteroids.Asteroid) {
    game.asteroids.splice(game.asteroids.indexOf(obj), 1)
  };
  if (obj instanceof Asteroids.Bullet) {
    game.bullets.splice(game.bullets.indexOf(obj), 1);
  };
  if (obj instanceof Asteroids.Display) {
    game.displays.splice(game.displays.indexOf(obj), 1);
  }
  if (game.asteroids.length === 0) {
    if (!game.newWaveTimer) {
      window.setTimeout(function() {
        game.levelup();
      }, 2000);
    };
    game.levelUpVector = [200, 0];
    game.newWaveTimer = true;
  };
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat(this.ship).concat(this.bullets);
};

Game.prototype.levelup = function() {
  var ship = this.ship;
  ship.invincibleFor(2000);
  this.newWaveTimer = false;
  this.newWave(this.NUM_ASTEROIDS + 1);
};

Game.prototype.newWave = function(level) {
  this.NUM_ASTEROIDS = level;
  this.addAsteroids();
}

Game.prototype.restart = function (){
  this.ship.shields = 100;
  this.newWave(4);
  this.ship.respawn();
  this.ship.angle = 0;
};

Game.prototype.start = function() {
  this.addAsteroids();
  this.bullets = [];
  this.displays = [new Asteroids.HuD(this)];
  this.ship = new Asteroids.Ship({game: this});
  this.background = new Asteroids.Background(this);
  this.levelUpVector = [200,0];
}


})();
