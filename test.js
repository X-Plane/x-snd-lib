#!/usr/bin/env node

const Attachment = require('./Attachment');

const VEH_PART_ENGINE = 'engine';
const VEH_PART_TIRE = 'tire';
const VEH_PART_COCKPIT = 'cockpit';

function Coords(x, y, z) {

	this.x = x;
	this.y = y;
	this.z = z;

}

function Event(name) {

	this.name = name;

	this.toString = function() {
		return `EVENT_NAME ${this.name}`;
	}

}

function Snapshot(name) {

	this.name = name;

	this.toString = function() {
		return `SNAPSHOT_NAME ${this.name}`;
	}

}

function VehPart(partEnum, partIdx) {

	this.partEnum = partEnum;
	this.partIdx = partIdx;

	this.toString = function() {
		return `VEH_PART ${this.partEnum} ${this.partIdx}`;
	};

	this.getIndex = function() {
		return this.partIdx;
	}
}

function VehXYZ(coords = {x:0, y:0, z:0}) {

	this.coords = coords;

	this.toString = function() {
		return `VEH_XYZ ${this.coords.x} ${this.coords.y} ${this.coords.z}`;
	}
}

function CondAlways() {
	this.toString = function() {
		return 'EVENT_ALWAYS';
	}
}
function CondStart(dref, op, value) {
	this.toString = function() {
		return `EVENT_START_COND ${dref} ${op} ${value}`;
	}
}
function CondStartDelta(dref, op, value) {
	this.toString = function() {
		return `EVENT_START_COND DELTA=${dref} ${op} ${value}`;
	}
}
function CondStartAbsDelta(dref, op, value) {
	this.toString = function() {
		return `EVENT_START_COND ABS_DELTA=${dref} ${op} ${value}`;
	}
}
function CondEnd(dref, op, value) {
	this.toString = function() {
		return `EVENT_END_COND ${dref} ${op} ${value}`;
	}
}
function CondEndDelta(dref, op, value) {
	this.toString = function() {
		return `EVENT_END_COND DELTA=${dref} ${op} ${value}`;
	}
}
function CondEndAbsDelta(dref, op, value) {
	this.toString = function() {
		return `EVENT_END_COND ABS_DELTA=${dref} ${op} ${value}`;
	}
}
function CondCommandUp(cmd) {
	this.toString = function() {
		return `EVENT_CMND_UP ${cmd}`;
	}
}
function CondCommandDown(cmd) {
	this.toString = function() {
		return `EVENT_CMND_DOWN ${cmd}`;
	}
}
function CondCommandHoldStop(cmd) {
	this.toString = function() {
		return `EVENT_CMND_HOLD_STOP ${cmd}`;
	}
}
function CondCommandHoldCue(cmd) {
	this.toString = function() {
		return `EVENT_CMND_HOLD_CUE ${cmd}`;
	}
}

const Engine0 = new VehPart(VEH_PART_ENGINE, 0);

let propEvent = new Attachment({
	obj: new Event('/da62/engines/prop'),
	// obj: new Snapshot('/in_cockpit'),
	location: Engine0,
	// location: new VehXYZ(new Coords(-0.2699, 0.31676, -20.8278)),
	allowAI: true,
	idx: Engine0.getIndex(),
	conditions: [
		new CondStart('sim/bla', '=', 0),
		new CondEnd('sim/bla', '=', 1)
	],
	remark: 'Engine!'
});

console.log(propEvent.toString());

