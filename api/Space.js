const Coords = require('../lib/Coords');
const BaseSoundSpace = require('../lib/SoundSpace');
const {Sphere, AABB} = require('../lib/Spaces');
const { remarkFromName } = require('./util');

function Space(name, remark = null) {
	if (this instanceof Space) {
		this.location = null;
		this.depth = null;
		this.idx = null;
		this.remark = remark === true ? remarkFromName(name) : remark;
	} else {
		return new Space(name, remark);
	}
}

Space.prototype = {

	toString: function () {
		return new BaseSoundSpace({
			loc: this.location,
			idx: this.idx,
			depth: this.depth,
			remark: this.remark
		}).toString();
	},

	aabb: function (x1, y1, z1, x2, y2, z2) {
		this.location = new AABB(new Coords(x1, y1, z1), new Coords(x2, y2, z2));
		return this;
	},

	sphere: function (x, y, z, r) {
		this.location = new Sphere(new Coords(x, y, z), r);
		return this;
	},

	setDepth: function (num) {
		this.depth = num;
		return this;
	},

	setIndex: function (num) {
		this.idx = num;
		return this;
	}
};

module.exports = {
	Space,
};