(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };
  var Bullet = Asteroids.Bullet = function (obj) {
    var RADIUS = 5;
    var COLOR = "#00F";
    Asteroids.MovingObject.call(this, {
      game: obj.game,
      radius: RADIUS,
      color: COLOR,
      pos: obj.pos,
      vel: obj.vel,
      magnitude: 10
    })
  };


  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

  })();
