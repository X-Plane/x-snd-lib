const BaseSeparator = require('../lib/Separator');

function Separator(remark) {
	if (this instanceof Separator) {
		this.remark = remark;
	} else {
		return new Separator(remark);
	}
}

Separator.prototype.setNamespace = function (namespace) { // noop
	return this;
};

Separator.prototype.toString = function () {
	return new BaseSeparator(this.remark).toString();
};

module.exports = {
	Separator
};