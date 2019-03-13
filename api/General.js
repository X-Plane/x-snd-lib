const BaseReqBank = require('../lib/General').RequiresBank;
const BaseDisLegacy = require('../lib/General').DisableLegacy;

function RequiresBank(name) {
	if (this instanceof RequiresBank) {
		this.name = name;
	} else {
		return new RequiresBank(name);
	}
}

RequiresBank.prototype.setNamespace = function (namespace) { // noop
	return this;
};

RequiresBank.prototype.toString = function () {
	return new BaseReqBank(this.name).toString();
};

function DisableLegacy() {
	if (this instanceof DisableLegacy) {
	} else {
		return new DisableLegacy();
	}
}

DisableLegacy.prototype.setNamespace = function (namespace) { // noop
	return this;
};

DisableLegacy.prototype.toString = function () {
	return new BaseDisLegacy().toString();
};

module.exports = {
	RequiresBank,
	DisableLegacy
};