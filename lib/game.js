(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Game = Asteroids.Game = function(canvasEl, level, gameView) {
  this.DIM_X = canvasEl.width;
  this.DIM_Y = canvasEl.height;
  this.NUM_ASTEROIDS = Game.SEED_ASTEROIDS + level;
  this.addAsteroids();
  this.ship = new Asteroids.Ship({game: this});
  this.bullets = [];
  this.gameView = gameView;
  this.displays = [new Asteroids.HuD(this)];
};

Game.SEED_ASTEROIDS = 3;


Game.prototype.addAsteroids = function() {
  this.asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++ ){
    this.asteroids.push(new Asteroids.Asteroid({
      pos: this.randomPosition(),
      game: this
    }));
  };
};

Game.prototype.randomPosition = function() {
  return [(Math.random() * this.DIM_X), (Math.random() * this.DIM_Y)];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach(function(piece) {
    piece.draw(ctx);
  });
};

Game.prototype.moveObjects = function(){
  this.allObjects().forEach(function(piece) {
    piece.move();
  });
};

Game.prototype.render = function(ctx){
  this.step();
  this.draw(ctx);
  this.drawDisplays(ctx);
  if (!this.ship.frozen) {
    this.getMovement();
    this.getShooting();
  };
  this.addFriction();
};

Game.prototype.drawDisplays = function(ctx){
  this.displays.forEach(function(display){
    display.draw(ctx);
  })
};

Game.prototype.addFriction = function (){
  this.ship.magnitude *= 0.95;
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
    { game.ship.power([thrust, 0]) };
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
};

Game.prototype.remove = function(obj) {
  var game = this;
  if(obj instanceof Asteroids.Asteroid) {
    if (obj.radius > 10) {
      for (i = 0; i < 2; i++) {
        game.asteroids.push(new Asteroids.Asteroid({
          pos: obj.pos,
          radius: obj.radius / 2,
          game: obj.game,
          vel: Asteroids.Util.randomVec(),
          magnitude: Asteroids.Util.setRandomMag(obj.radius / 2)
        }));
      };
    };
    game.asteroids.splice(game.asteroids.indexOf(obj), 1)
  };
  if (obj instanceof Asteroids.Bullet) {
    game.bullets.splice(game.bullets.indexOf(obj), 1);
  };
  if (game.asteroids.length === 0) {
    if (!game.newWaveTimer) {
      window.setTimeout(function() {
        game.levelup();
      }, 1500);
    };
    game.newWaveTimer = true;
  };
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat(this.ship).concat(this.bullets);
};

Game.prototype.levelup = function() {
  var ship = this.ship;
  ship.invincible = true;
  this.newWaveTimer = false;
  this.newWave(this.NUM_ASTEROIDS + 1);
  window.setTimeout(function() {
    ship.invincible = false;
  }, 2000);
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


})();
