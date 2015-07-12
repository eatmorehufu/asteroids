# Asteroids: Twin Sticks

## About
I created this Asteroids game demo using javascript, HTML canvas and a small
bit of jQuery. I've never been a fan of the traditional asteroids control
scheme so I opted to implement the modern twin-stick control scheme instead.
The benefits of this scheme is that it gives a more precise degree of control
over the ship, allowing for a better feel and gameplay experience. All of the
features as listed below were done by hand without use of any library or
framework, for the purpose of developing my own problem solving skills in
javascript and canvas.

## Features
* Plenty of trigonometry
  * all object movement captured as unit vectors and magnitudes
  * ship angle is determined by the arcTan of either shooting or movement
    vectors
  * ship vector is calculated by combining unit vector of thrust and current
    vector with accompanying magnitude coefficients.
* Input smoothing
  * Multiple inputs register smoothly, so that the order of keydown or keyup
    does not unexpectedly change the desired ship behavior.
* Sprite Animations
  * hand-calculated explosion and ship animations, as well as shield flicker
* Dynamic Animations
  * Ship thrusters animate when moving, turn off when still
  * Parallax stars drift slightly differently based on ship movement
  * Ship points in the direction its moving when not shooting
* Collision Detection System
  * Asteroids collide and bounce off of each other
  * Bullets collide with and destroy asteroids
  * Asteroids hit and damage ship's shields.
  * Ship hitbox is smaller than ship sprite in order to create more "near miss"
    gameplay experiences.

## Credits
© Dean Hu 2015. Ship and asteroids sprites generously provided by Bobby Frye.
