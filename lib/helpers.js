const { Event, Snapshot } = require('./Events');
const Coords = require('./Coords');
const Separator = require('./Separator');

function sound(name) {
	return new Event(name);
}

function snap(name) {
	return new Snapshot(name);
}

function xyz(x, y, z) {
	return new Coords(x,y,z)
}

function separator(remark) {
	return new Separator(remark)
}

function repeat(count, callback) {
	for(let i=0; i < count; i++) {
		callback(i);
	}
}

module.exports = {
	sound,
	snap,
	xyz,
	separator,
	repeat
};