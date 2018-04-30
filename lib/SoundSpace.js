const { EOL, TAB } = require('./constants');
const { Sphere, AABB } = require('./Spaces');

function SoundSpace({loc, depth, idx, remark}) {

	this.location = loc;
	this.depth = depth;
	this.idx = idx;
	this.remark = remark;

	if (!this.location instanceof Sphere || !this.location instanceof AABB) {
		throw new Error('SoundSpace: unknown location type');
	}
	if (this.idx === undefined) {
		throw new Error('SoundSpace: index not specified');
	}

	this.toString = function() {
		let ret = '';
		if (this.remark) {
			ret += `# -------------------- ${this.remark} ---------------------` + EOL;
		}
		ret += 'BEGIN_SOUND_SPACE' + EOL;
		ret += TAB + `SOUND_INDEX ${this.idx}` + EOL;
		if (this.depth) {
			ret += TAB + `BLEND_DEPTH ${this.depth}` + EOL;
		}
		ret += TAB + this.location.toString() + EOL;
		ret += 'END_SOUND_SPACE' + EOL;
		return ret;
	}
}

module.exports = SoundSpace;