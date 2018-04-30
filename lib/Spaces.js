const Coords = require('./Coords');

function Sphere(center = new Coords(0,0,0), radius) {
	if (!center instanceof Coords) {
		throw new Error('Sphere: Coordinates should be a instance of Coords');
	}
	if (!radius) {
		throw new Error('Sphere: Invalid or missing radius');
	}
	this.radius = radius;
	this.toString = function() {
		return `SPHERE ${this.center.x} ${this.center.y} ${this.center.z} ${this.radius}`;
	};
}

function AABB(minCoords = new Coords(0,0,0), maxCoords = new Coords(0,0,0)) {
	if (!minCoords instanceof Coords) {
		throw new Error('AABB: Min coordinates should be a instance of Coords');
	}
	if (!maxCoords instanceof Coords) {
		throw new Error('AABB: Max coordinates should be a instance of Coords');
	}
	this.minCoords = minCoords;
	this.maxCoords = maxCoords;
	this.toString = function() {
		return `AABB ${this.minCoords.x} ${this.minCoords.y} ${this.minCoords.z} ${this.maxCoords.x} ${this.maxCoords.y} ${this.maxCoords.z}`;
	}
}

module.exports = {
	Sphere,
	AABB
};