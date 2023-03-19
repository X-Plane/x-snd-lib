const { EOL, TAB } = require('./constants');
const { VehPart, VehXYZ } = require('./VehParts');

function Attachment({obj, loc, the, psi, phi, ai, poly, idx, conds, remark}) {

	this.obj = obj;
	this.location = loc;
	this.o_the = the;
	this.o_psi = psi;
	this.o_phi = phi;
	this.allowAI = ai;
	this.polyphonic = poly;
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
		console.log(this);
		if (this.o_the) {
			ret += TAB + this.o_the.toString() + EOL;
		}
		if (this.o_psi) {
			ret += TAB + this.o_psi.toString() + EOL;
		}
		if (this.o_phi) {
			ret += TAB + this.o_phi.toString() + EOL;
		}
		if (this.allowAI) {
			ret += TAB + 'EVENT_ALLOWED_FOR_AI' + EOL;
		}
		if (this.polyphonic) {
			ret += TAB + 'EVENT_POLYPHONIC' + EOL;
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