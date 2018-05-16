const { EOL, TAB } = require('./constants');
const { VehPart, VehXYZ } = require('./VehParts');

function Attachment({obj, loc, ai, idx, conds, remark}) {

	this.obj = obj;
	this.location = loc;
	this.allowAI = ai;
	this.idx = idx;
	this.conditions = conds;
	this.remark = remark;

	if (this.location) {
		if (!(this.location instanceof VehPart) && !(this.location instanceof VehXYZ)) {
			throw new Error(`Attachment: unknown location type at ${remark}`);
		}
	}
	if (!this.conditions.length) {
		throw new Error(`Attachment: no conditions given at ${remark}`);
	}

	this.toString = function() {
		let ret = '';
		if (this.remark) {
			ret += EOL + `# -------------------- ${this.remark} ---------------------` + EOL;
		}
		ret += 'BEGIN_SOUND_ATTACHMENT' + EOL;
		ret += TAB + this.obj.toString() + EOL;
		if (this.location) {
			ret += TAB + this.location.toString() + EOL;
		}
		if (this.allowAI) {
			ret += TAB + 'EVENT_ALLOWED_FOR_AI' + EOL;
		}
		if (this.idx !== null && this.idx !== undefined) {
			ret += TAB + `PARAM_DREF_IDX ${this.idx}` + EOL;
		}
		this.conditions.forEach(c => {
			ret += TAB + c.toString() + EOL
		});

		ret += 'END_SOUND_ATTACHMENT' + EOL;
		return ret;
	}
}

module.exports = Attachment;