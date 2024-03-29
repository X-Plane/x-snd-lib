const Coords = require('../lib/Coords');
const BaseEvent = require('../lib/Events').Event;
const BaseSnapshot = require('../lib/Events').Snapshot;
const BaseAttachment = require('../lib/Attachment');

const { remarkFromName } = require('./util');

const {
	CondAlways,
	CondStart,
	CondEnd,
	CondCueTrigger,
	CondCommandUp,
	CondCommandDown,
	CondCommandHoldStop,
	CondCommandHoldCue,
	CondAutoEnd
} = require('../lib/Conditions');

const {
	VehXYZ,
	VehThe,
	VehPhi,
	VehPsi,
	Cockpit,
	Tire,
	Engine
} = require('../lib/VehParts');

function Attachment(name, remark = null, attType) {
	if (this instanceof Attachment) {
		this.attType = attType;
		this.name = name;
		this.namespace = '';
		this.location = null;
		this.o_the = null;
		this.o_psi = null;
		this.o_phi = null;
		this.allowAI = false;
		this.polyphonic = false;
		this.idx = null;
		this.conditions = [];
		this.remark = remark === true ? remarkFromName(name) : remark;
	} else {
		return new Attachment(name, remark, attType);
	}
}

Attachment.prototype.toString = function () {
	if (!this.location && this.attType === BaseEvent) {
		console.log(`Attachment: No position set, using CG at ${this.name}.`);
		this.location = new VehXYZ(new Coords(0, 0, 0));
	}
	return new BaseAttachment({
		obj: new this.attType(`${this.namespace}${this.name}`),
		loc: this.location,
		the: this.o_the,
		psi: this.o_psi,
		phi: this.o_phi,
		ai: this.allowAI,
		poly: this.polyphonic,
		idx: this.idx,
		conds: this.conditions,
		remark: this.remark
	}).toString();
};

Attachment.prototype.setNamespace = function (namespace) {
	this.namespace = namespace;
	return this
};

Attachment.prototype.setIndex = function (num) {
	this.idx = num;
	return this
};

Attachment.prototype.pos = function (x, y, z) {
	this.location = new VehXYZ(new Coords(x, y, z));
	return this;
};

Attachment.prototype.the = function (num) {
	this.o_the = new VehThe(num);
	return this;
}

Attachment.prototype.psi = function (num) {
	this.o_psi = new VehPsi(num);
	return this;
}

Attachment.prototype.phi = function (num) {
	this.o_phi = new VehPhi(num);
	return this;
}

Attachment.prototype.engine = function (num) {
	this.location = new Engine(num);
	this.idx = num;
	return this;
};

Attachment.prototype.tire = function (num) {
	this.location = new Tire(num);
	this.idx = num;
	return this;
};

Attachment.prototype.cockpit = function (num) {
	this.location = new Cockpit(num);
	this.idx = num;
	return this;
};

Attachment.prototype.ai = function () {
	this.allowAI = true;
	return this;
};

Attachment.prototype.poly = function () {
	this.polyphonic = true;
	return this;
};

Attachment.prototype._parseCond = function (cond) {
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

Attachment.prototype._addConds = function (exp, condType) {
	let conds = exp;
	if (!Array.isArray(exp)) {
		conds = [exp];
	}
	conds.forEach(cond => {
		let p = this._parseCond(cond);
		this.conditions.push(new condType(p.dref, p.op, p.value));
	});
};

Attachment.prototype.start = function (exp) {
	this._addConds(exp, CondStart);
	return this;
};

Attachment.prototype.end = function (exp) {
	this._addConds(exp, CondEnd);
	return this;
};

Attachment.prototype.cue = function (exp) {
	this._addConds(exp, CondCueTrigger);
	return this;
};

Attachment.prototype.whileNot = function (dref, value) {
	this.conditions = [
		new CondStart(dref, '!=', value),
		new CondEnd(dref, '==', value)
	];
	return this;
};

Attachment.prototype.whileEquals = function (dref, value) {
	this.conditions = [
		new CondStart(dref, '==', value),
		new CondEnd(dref, '!=', value)
	];
	return this;
};

Attachment.prototype.whileGreater = function (dref, value) {
	this.conditions = [
		new CondStart(dref, '>', value),
		new CondEnd(dref, '<', value)
	];
	return this;
};

Attachment.prototype.whileLess = function (dref, value) {
	this.conditions = [
		new CondStart(dref, '<', value),
		new CondEnd(dref, '>', value)
	];
	return this;
};

Attachment.prototype.onEquals = function (dref, value) {
	this.conditions = [
		new CondStart(dref, '==', value)
	];
	return this;
};

Attachment.prototype.onNot = function (dref, value) {
	this.conditions = [
		new CondStart(dref, '!=', value)
	];
	return this;
};

Attachment.prototype.onEqualsCue = function (dref, value1, value2) {
	this.conditions = [
		new CondStart(dref, '==', value1),
		new CondCueTrigger(dref, '==', value2)
	];
	return this;
};

Attachment.prototype.onGreater = function (dref, value) {
	this.conditions = [
		new CondStart(dref, '>', value)
	];
	return this;
};

Attachment.prototype.onLess = function (dref, value) {
	this.conditions = [
		new CondStart(dref, '<', value)
	];
	return this;
};

Attachment.prototype.always = function () {
	this.conditions = [new CondAlways()];
	return this;
};

Attachment.prototype.autoEnd = function () {
	this.conditions.push(new CondAutoEnd())
	return this;
};

Attachment.prototype.commandDown = function (cmd) {
	this.conditions = [new CondCommandDown(cmd)];
	return this;
};

Attachment.prototype.commandUp = function (cmd) {
	this.conditions = [new CondCommandUp(cmd)];
	return this;
};

Attachment.prototype.commandCue = function (cmd) {
	this.conditions = [new CondCommandHoldCue(cmd)];
	return this;
};

Attachment.prototype.commandStop = function (cmd) {
	this.conditions = [new CondCommandHoldStop(cmd)];
	return this;
};

function Event(name, remark = null) {
	return new Attachment(name, remark, BaseEvent)
}

function Snapshot(name, remark = null) {
	return new Attachment(name, remark, BaseSnapshot)
}

module.exports = {
	Attachment,
	Event,
	Snapshot
};