const { Event, Snapshot } = require('./Events');
const Coords = require('./Coords');

function sound(name) {
	return new Event(name);
}

function snap(name) {
	return new Snapshot(name);
}

function xyz(x, y, z) {
	return new Coords(x,y,z)
}

module.exports = {
	sound,
	snap,
	xyz
};