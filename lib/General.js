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

module.exports = {
	RequiresBank,
	DisableLegacy
};