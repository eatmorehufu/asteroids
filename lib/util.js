(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

var util = Asteroids.Util = {};

util.inherits = function(ChildClass, ParentClass) {
  var Surrogate = function (){};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
};

util.randomVec = function() {
  var x = Math.random()*2 - 1;
  var y = Math.random()*2 - 1;

  return util.normalizeVec([x, y]);
};

util.randomMag = function(maxSpeed, minSpeed) {
  return Math.random() * (maxSpeed - minSpeed) + minSpeed;
}

util.setRandomMag = function(radius) {
  if (radius === 40) {
    return util.randomMag(3, 1);
  } else if (radius === 20) {
    return util.randomMag(4, 2);
  } else {
    return util.randomMag(6, 2);
  }
};

util.normalizeVec = function(vecArray) {
  var x = vecArray[0];
  var y = vecArray[1];
  var mult = 1 / Math.sqrt(x * x + y * y);
  return [x * mult, y * mult];
};

util.getMagnitude = function(vecArray) {
  var x = vecArray[0];
  var y = vecArray[1];
  return Math.sqrt(x * x + y * y);
}

})();
