const { LT, LTE, EQ, NEQ, GTE, GT } = require ('./constants');

function CondAlways() {
	this.toString = function() {
		return 'EVENT_ALWAYS';
	}
}

function CondGeneric(type, dref = '', op = '', value) {
	if (!dref) {
		throw new Error(`CondGeneric ${type}: missing dataref`);
	}
	if (![LT, LTE, EQ, NEQ, GTE, GT].includes(op)) {
		throw new Error(`CondGeneric ${type}: invalid operator '${op}'`);
	}
	if (value === undefined) {
		throw new Error(`CondGeneric ${type}: missing value`);
	}
	this.toString = function() {
		return `${type} ${dref.trim()} ${op} ${value}`;
	}
}

function CondCommand(type, cmd) {
	if (!cmd) {
		throw new Error(`CondCommand ${type}: missing command`);
	}
	this.toString = function() {
		return `${type} ${cmd}`;
	}
}

function CondStart(dref, op, value) { return new CondGeneric('EVENT_START_COND', dref, op, value) }
function CondEnd(dref, op, value) { return new CondGeneric('EVENT_END_COND', dref, op, value) }
function CondCueTrigger(dref, op, value) { return new CondGeneric('CUE_TRIGGER_COND', dref, op, value) }

function CondStartDelta(dref, op, value) { return new CondStart('DELTA=' + dref, op, value) }
function CondStartAbsDelta(dref, op, value) { return new CondStart('ABS_DELTA=' + dref, op, value) }
function CondEndDelta(dref, op, value) { return new CondEnd('DELTA=' + dref, op, value) }
function CondEndAbsDelta(dref, op, value) { return new CondEnd('ABS_DELTA=' + dref, op, value) }

function CondCommandUp(cmd) { return new CondCommand('EVENT_CMND_UP', cmd) }
function CondCommandDown(cmd) { return new CondCommand('EVENT_CMND_DOWN', cmd) }
function CondCommandHoldStop(cmd) { return new CondCommand('EVENT_CMND_HOLD_STOP', cmd) }
function CondCommandHoldCue(cmd) { return new CondCommand('EVENT_CMND_HOLD_CUE', cmd) }

module.exports = {
	CondAlways,
	CondStart,
	CondCueTrigger,
	CondStartDelta,
	CondStartAbsDelta,
	CondEnd,
	CondEndDelta,
	CondEndAbsDelta,
	CondCommandUp,
	CondCommandDown,
	CondCommandHoldStop,
	CondCommandHoldCue
};