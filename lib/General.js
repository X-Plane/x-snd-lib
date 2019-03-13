function RequiresBank(name) {
	if (!name) {
		throw new Error('RequiresBank: Missing bank name');
	}
	this.name = name;
	this.toString = function() {
		return `REQUIRES_BANK ${this.name.trim()}`;
	}
}

function DisableLegacy() {
	this.toString = function() {
		return `DISABLE_LEGACY_ALERT_SOUNDS`;
	}
}

module.exports = {
	RequiresBank,
	DisableLegacy
};