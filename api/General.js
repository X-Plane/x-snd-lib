const BaseReqBank = require('../lib/General').RequiresBank;
const BaseDisLegacy = require('../lib/General').DisableLegacy;
const BaseRefPoint = require('../lib/General').RefPointAcf;

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

function RefPointAcf(y, z) {
	if (this instanceof RefPointAcf) {
		this.y = y;
		this.z = z;
	} else {
		return new RefPointAcf(y, z);
	}
}

RefPointAcf.prototype.setNamespace = function (namespace) { // noop
	return this;
};

RefPointAcf.prototype.toString = function () {
	return new BaseRefPoint(this.y, this.z).toString();
};

module.exports = {
	RequiresBank,
	DisableLegacy,
	RefPointAcf,
};