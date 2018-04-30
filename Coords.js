function Coords(x, y, z) {
	if (x === undefined || y === undefined || z === undefined) {
		throw new Error(`Coords: missing coordinate at x:${x}, y:${y}, z:${z}`);
	}
	this.x = x;
	this.y = y;
	this.z = z;
}

module.exports = Coords;