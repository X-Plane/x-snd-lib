const Coords = require('./Coords');

function Sphere(center = new Coords(0,0,0), radius) {
	if (!(center instanceof Coords)) {
		throw new Error('Sphere: Coordinates should be a instance of Coords');
	}
	if (!radius) {
		throw new Error('Sphere: Invalid or missing radius');
	}
	this.radius = radius;
	this.center = center;
	this.toString = function() {
		return `SPHERE ${this.center.x.toFixed(3)} ${this.center.y.toFixed(3)} ${this.center.z.toFixed(3)} ${this.radius.toFixed(3)}`;
	};
}

function AABB(minCoords = new Coords(0,0,0), maxCoords = new Coords(0,0,0)) {
	if (!(minCoords instanceof Coords)) {
		throw new Error('AABB: Min coordinates should be a instance of Coords');
	}
	if (!(maxCoords instanceof Coords)) {
		throw new Error('AABB: Max coordinates should be a instance of Coords');
	}
	this.minCoords = minCoords;
	this.maxCoords = maxCoords;
	this.toString = function() {
		return `AABB ${this.minCoords.x.toFixed(3)} ${this.minCoords.y.toFixed(3)} ${this.minCoords.z.toFixed(3)} ${this.maxCoords.x.toFixed(3)} ${this.maxCoords.y.toFixed(3)} ${this.maxCoords.z.toFixed(3)}`;
	}
}

module.exports = {
	Sphere,
	AABB
};