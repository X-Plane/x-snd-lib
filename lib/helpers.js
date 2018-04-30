const { Event, Snapshot } = require('./Events');
const Coords = require('./Coords');
const Separator = require('./Separator');
const Attachment = require('./Attachment');
const { CondEnd, CondStart, CondAlways } = require('./Conditions');
const { Engine, VehXYZ } = require('./VehParts');

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

function engineSound(remark, idx, eventName, dref, opStart, valueStart, opEnd, valueEnd) {
	let conds = [
		new CondStart(dref, opStart, valueStart)
	];
	if (opEnd !== undefined && valueEnd !== undefined) {
		conds.push(new CondEnd(dref, opEnd, valueEnd))
	}
	return new Attachment({
		obj: sound(eventName),
		loc: new Engine(idx),
		idx,
		ai: true,
		conds: conds,
		remark: `Engine ${idx+1} ${remark}`
	})
}

function alwaysSound(remark, eventName, loc) {
	return new Attachment({
		obj: sound(eventName),
		loc: loc || new VehXYZ(xyz(0,0,0)),
		conds: [
			new CondAlways()
		],
		remark
	})
}

function simpleSound(remark, eventName, loc, dref, opStart, valueStart, opEnd, valueEnd) {
	let conds = [
		new CondStart(dref, opStart, valueStart)
	];
	if (opEnd !== undefined && valueEnd !== undefined) {
		conds.push(new CondEnd(dref, opEnd, valueEnd))
	}
	return new Attachment({
		obj: sound(eventName),
		loc: loc || new VehXYZ(xyz(0,0,0)),
		conds: conds,
		remark
	})
}

module.exports = {
	sound,
	snap,
	xyz,
	separator,
	repeat,
	engineSound,
	alwaysSound,
	simpleSound
};