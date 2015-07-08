(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

var Ship = Asteroids.Ship = function(obj){
  this.shields = 100;
  this.frozen = false;
  this.spriteFrame = 0;
  this.animSprite = 0;
  this.angle = 0;
  this.recentBulletTimer;
  Asteroids.MovingObject.call(this, {
    game: obj.game,
    radius: Ship.RADIUS,
    pos: [obj.game.DIM_X / 2, obj.game.DIM_Y/ 2],
    vel: Ship.VEL,
    magnitude: 0
  });
  this.respawn();
};

Ship.RADIUS = 10;
Ship.VEL = [0, -1];
Ship.sprite = new Image();
Ship.sprite.src = './assets/sprite_sheet.png';

Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

Ship.prototype.respawn = function () {
  var ship = this;
  this.frozen = false;
  this.vel = [0,0];
  this.pos = [this.game.DIM_X / 2, this.game.DIM_Y/ 2];
  this.invincibleFor(2000);
};

Ship.prototype.draw = function (ctx) {
  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.rotate(this.angle);
  if (this.frozen) {
    ctx.drawImage(Ship.sprite, 0, 0, 60, 60, -30, -30, 60, 60);
  } else {
    ctx.drawImage(Ship.sprite, this.spriteFrame, 0, 60, 60, -30, -30, 60, 60);
    if (this.animSprite === 0) {
      if (this.thrusting) {
        this.spriteFrame = (this.spriteFrame + 60) % 480;
      } else {
        this.spriteFrame = (this.spriteFrame + 60) % 180;
      }
    }
    this.animSprite = (this.animSprite + 1) % 4; // sets frequency of animation based on global refresh rate.
  };

  ctx.restore();
  this.thrusting = false;
};

Ship.prototype.ricochet = function() {
  var ship = this;
  this.frozen = true;
  this.vel = Asteroids.Util.randomVec();
  this.magnitude = 12;
  this.invincibleFor(2000);
  window.setTimeout(function() {
    ship.frozen = false;
  }, 250);
}

Ship.prototype.power = function(impulse) {
  var nextVel = [
    (this.vel[0] * this.magnitude + impulse[0] * 0.2),
    (this.vel[1] * this.magnitude + impulse[1] * 0.2)
  ];
  var newSpeed = Asteroids.Util.getMagnitude(nextVel);
  var newVel = Asteroids.Util.normalizeVec(nextVel);
  if (!this.recentBulletTimer) {
    this.angle = Asteroids.Util.findAngle(newVel, [0,0], 0);
  }
  this.vel[0] = newVel[0];
  this.vel[1] = newVel[1];
  if (newSpeed > 7) {
    this.magnitude = 7;
  } else{
    this.magnitude = newSpeed;
  };
  this.thrusting = true;
};

Ship.prototype.fireBullet = function (vec) {
  var testX = (this.vel[0] * this.magnitude) + (vec[0] * 10);
  var testY = (this.vel[1] * this.magnitude) + (vec[1] * 10);
  var normalizedVec = Asteroids.Util.normalizeVec([testX, testY]);

  this.setAngle(vec);

  var bullet = new Asteroids.Bullet({
    pos: this.pos,
    vel: normalizedVec,
    game: this.game
  });
  var game = this.game;
  game.bullets.push(bullet);
};

Ship.prototype.setAngle = function(vec){
  this.angle = Asteroids.Util.findAngle(vec, this.vel, this.magnitude);
  if (this.recentBulletTimer) {
    window.clearTimeout(this.recentBulletTimer);
  }

  this.recentBulletTimer = window.setTimeout(function(){
    this.recentBulletTimer = undefined;
  }.bind(this), 1000);
}

Ship.prototype.handleCollision = function(obj) {
  if (obj instanceof Asteroids.Asteroid && !this.invincible) {
    this.shields -= 20;
    if (this.shields <= 0) {
      this.game.isOver = true;
      this.frozen = true;
      this.invincible = true;
    } else {
      this.ricochet();
    };
  }
}

Ship.prototype.invincibleFor = function(ms) {
  this.invincible = true;
  window.setTimeout(function(){
    this.game.displays.push(new Asteroids.InvincibilityShield(this.game).expireAfter(2000));
  }.bind(this), 0);
  window.setTimeout(function() {
    this.invincible = false;
  }.bind(this), ms);
}

})();
