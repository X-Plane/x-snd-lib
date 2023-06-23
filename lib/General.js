const { EOL, TAB } = require('./constants');

function RequiresBank(name) {
	if (!name) {
		throw new Error('RequiresBank: Missing bank name');
	}
	this.name = name;
	this.toString = function() {
		return `${EOL}REQUIRES_BANK ${this.name.trim()}${EOL}`;
	}
}

function DisableLegacy() {
	this.toString = function() {
		return `${EOL}DISABLE_LEGACY_ALERT_SOUNDS${EOL}`;
	}
}

function RefPointAcf(y, z) {
	if (y !== undefined && z !== undefined) {
		this.y = parseFloat(y);
		this.z = parseFloat(z);
	} else {
		this.y = 0;
		this.z = 0;
	}
	this.toString = function() {
		let args;
		if (this.y || this.z) {
			args = `${this.y} ${this.z}`;
		}
		return [EOL, 'REF_POINT_ACF', args, EOL].join(' ').trim();
	}
}

module.exports = {
	RequiresBank,
	DisableLegacy,
	RefPointAcf,
};