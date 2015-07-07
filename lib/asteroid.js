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
  if (this.radius === 40) {
    ctx.drawImage(Asteroid.METEORS[0], 0 ,0, 99, 75, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius * 2, this.radius * 2);
  } else if (this.radius === 20) {
    ctx.drawImage(Asteroid.METEORS[Math.floor(Math.random() * 2 + 1)], 0 ,0, 48, 51, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius * 2, this.radius * 2);
  } else {
    ctx.drawImage(Asteroid.METEORS[Math.floor(Math.random() * 3 + 3)], 0 ,0, 24, 27, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius * 2, this.radius * 2);
  };
}
Asteroid.prototype.handleCollision = function(obj) {
  if (obj instanceof Asteroids.Bullet) {
    if (this.radius > 10) {
      this.split();
    };
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

})();
