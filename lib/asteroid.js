(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Asteroid = Asteroids.Asteroid = function(options) {
  Asteroids.MovingObject.call(this, {
    game: options.game,
    radius: options.radius || Asteroid.RADIUS,
    pos: options.pos,
    vel: Asteroids.Util.randomVec(),
    magnitude: options.magnitude || Asteroids.Util.setRandomMag(Asteroid.RADIUS)
  });
};

Asteroid.RADIUS = 40;

Asteroid.METEORS = [];

[
  'rock1.png',
  'rock_m1.png',
  'rock_m2.png',
  'rock_s1.png',
  'rock_s2.png',
  'rock_s3.png'
].forEach(function(image) {
  var newImage = new Image();
  newImage.src = './assets/' + image;
  Asteroid.METEORS.push(newImage);
})

Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

Asteroid.prototype.draw = function(ctx) {
  var sprite, height, width;
  if (!this.sizePercent || this.sizePercent > 100) {
    this.sizePercent = 100;
  }

  if (this.radius === 40) {
      sprite = Asteroid.METEORS[0];
      width = 99;
      height = 75;
  } else if (this.radius === 20) {
      sprite = Asteroid.METEORS[Math.floor(Math.random() * 2 + 1)];
      width = 48;
      height = 51;
  } else {
      sprite = Asteroid.METEORS[Math.floor(Math.random() * 3 + 3)];
      width = 24;
      height = 27;
  };
  ctx.drawImage(
    sprite,
    0 ,0, width, height,
    this.pos[0] - (this.radius * this.sizePercent / 100),
    this.pos[1] - (this.radius * this.sizePercent / 100),
    this.radius * 2 * this.sizePercent / 100,
    this.radius * 2 * this.sizePercent / 100
  );

  if (this.sizePercent < 100) {
    this.sizePercent *= this.growthSpeed;
  }
}
Asteroid.prototype.handleCollision = function(obj) {
  if (obj instanceof Asteroids.Bullet) {
    if (this.radius > 10) {
      this.split();
    };
    this.game.displays.push(new Asteroids.Explosion(this.game).setExplosion(this.pos, this.radius));
    this.game.remove(this);
  } else if (obj instanceof Asteroids.Asteroid && !this.hasCollided) {
    this.hasCollided = true;
    this.vel = Asteroids.Util.randomVec();
    this.magnitude = Asteroids.Util.setRandomMag(this.radius);
    window.setTimeout(function(){
      this.hasCollided = false;
    }.bind(this), 2000);
  }
}

Asteroid.prototype.split = function(){
  var asteroid = this;
  for (i = 0; i < 2; i++) {
    this.game.asteroids.push(new Asteroids.Asteroid({
      pos: asteroid.pos,
      radius: asteroid.radius / 2,
      game: asteroid.game,
      vel: Asteroids.Util.randomVec(),
      magnitude: Asteroids.Util.setRandomMag(asteroid.radius / 2)
    }));
  };
}

Asteroid.prototype.growIn = function() {
  this.sizePercent = 1;
  this.growthSpeed = Math.random() * 0.2 + 1.048;
  return this;
}

})();
