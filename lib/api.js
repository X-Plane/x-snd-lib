const Coords = require('./Coords');
const BaseEvent = require('./Events').Event;
const BaseSnapshot = require('./Events').Snapshot;
const BaseAttachment = require('./Attachment');
const BaseSoundSpace = require('./SoundSpace');
const { Sphere, AABB } = require('./Spaces');
const {
	CondAlways,
	CondStart,
	CondEnd,
	CondCueTrigger,
	CondCommandUp,
	CondCommandDown,
	CondCommandHoldStop,
	CondCommandHoldCue
} = require('./Conditions');

const {
	VehXYZ,
	Cockpit,
	Tire,
	Engine
} = require('./VehParts');


function Attachment(name, remark = null, attType) {

	this.name = name;
	this.location = null;
	this.allowAI = false;
	this.idx = null;
	this.conditions = [];
	this.remark = remark || name; // todo: sanitize and embellish name

	this.toString = function() {
		if (!this.location) {
			console.log(`Attachment: No position set, using CG at ${this.remark}.`);
			this.location = new VehXYZ(new Coords(0, 0, 0));
		}
		return new BaseAttachment({
			obj: new attType(this.name),
			loc: this.location,
			ai: this.allowAI,
			idx: this.idx,
			conds: this.conditions,
			remark: this.remark
		}).toString();
	};

	this.setNamespace = function(namespace) {
		this.name = `${namespace}${name}`;
		return this
	};

	this.index = function(num) {
		this.idx = num;
		return this
	};

	this.pos = function(x, y, z) {
		this.location = new VehXYZ(new Coords(x, y, z));
		return this;
	};

	this.engine = function(num) {
		this.location = new Engine(num);
		this.idx = num;
		return this;
	};

	this.tire = function(num) {
		this.location = new Tire(num);
		this.idx = num;
		return this;
	};

	this.cockpit = function(num) {
		this.location = new Cockpit(num);
		this.idx = num;
		return this;
	};

	this.ai = function() {
		this.allowAI = true;
		return this;
	};

	this._parseCond = function(cond) {
		let parts = cond.split(' ');
		if (!parts.length === 3) {
			throw new Error(`Attachment: invalid condition format at ${this.remark}: ${cond}.`)
		}
		return {
			dref: parts[0],
			op: parts[1],
			value: parts[2]
		}
	};

	this._addConds = function(exp, condType) {
		let conds = exp;
		if (!Array.isArray(exp)) {
			conds = [exp];
		}
		conds.forEach(cond => {
			let p = this._parseCond(cond);
			this.conditions.push(new condType(p.dref, p.op, p.value));
		});
	};

	this.start = function(exp) {
		this._addConds(exp, CondStart);
		return this;
	};

	this.end = function(exp) {
		this._addConds(exp, CondEnd);
		return this;
	};

	this.cue = function(exp) {
		this._addConds(exp, CondCueTrigger);
		return this;
	};

	this.whileNot = function(dref, value) {
		this.conditions = [
			new CondStart(dref, '!=', value),
			new CondEnd(dref, '==', value)
		];
		return  this;
	};

	this.whileEquals = function(dref, value) {
		this.conditions = [
			new CondStart(dref, '==', value),
			new CondEnd(dref, '!=', value)
		];
		return  this;
	};

	this.whileGreater = function(dref, value) {
		this.conditions = [
			new CondStart(dref, '>', value),
			new CondEnd(dref, '<', value)
		];
		return  this;
	};

	this.whileLess = function(dref, value) {
		this.conditions = [
			new CondStart(dref, '<', value),
			new CondEnd(dref, '>', value)
		];
		return  this;
	};

	this.onEquals = function(dref, value) {
		this.conditions = [
			new CondStart(dref, '==', value)
		];
		return  this;
	};

	this.onNot = function(dref, value) {
		this.conditions = [
			new CondStart(dref, '!=', value)
		];
		return  this;
	};

	this.onEqualsCue = function(dref, value1, value2) {
		this.conditions = [
			new CondStart(dref, '==', value1),
			new CondCueTrigger(dref, '==', value2)
		];
		return  this;
	};

	this.onGreater = function(dref, value) {
		this.conditions = [
			new CondStart(dref, '>', value)
		];
		return  this;
	};

	this.onLess = function(dref, value) {
		this.conditions = [
			new CondStart(dref, '<', value)
		];
		return  this;
	};

	this.always = function() {
		this.conditions = [ new CondAlways() ];
		return this;
	};

	this.commandDown = function(cmd) {
		this.conditions = [ new CondCommandDown(cmd) ];
		return this;
	};

	this.commandUp = function(cmd) {
		this.conditions = [ new CondCommandUp(cmd) ];
		return this;
	};

	this.commandCue = function(cmd) {
		this.conditions = [ new CondCommandHoldCue(cmd) ];
		return this;
	};

	this.commandStop = function(cmd) {
		this.conditions = [ new CondCommandHoldStop(cmd) ];
		return this;
	};

	return this;

}

function Space(name, remark = null) {

	this.name = name;
	this.location = null;
	this.depth = null;
	this.idx = null;
	this.remark = remark || name; // todo: sanitize and embellish name

	this.toString = function() {
		return new BaseSoundSpace({
			loc: this.location,
			idx: this.idx,
			depth: this.depth,
			remark: this.remark
		}).toString();
	};

	this.setNamespace = function(namespace) {
		this.name = `${namespace}${name}`;
		return this
	};

	this.aabb = function(x1, y1, z1, x2, y2, z2) {
		this.location = new AABB(new Coords(x1, y1, z1), new Coords(x2, y2, z2));
		return this;
	};

	this.sphere = function(x, y, z, r) {
		this.location = new Sphere(new Coords(x, y, z), r);
		return this;
	};

	this.depth = function(num) {
		this.depth = num;
		return this
	};

	this.index = function(num) {
		this.idx = num;
		return this
	};

	return this;
}


function Event(name, remark = null) {
	return new Attachment(name, remark, BaseEvent)
}

function Snapshot(name, remark = null) {
	return new Attachment(name, remark, BaseSnapshot)
}

module.exports = {
	Event,
	Snapshot,
	Space
};