function Attachment({obj, location, allowAI, idx, conditions, remark}) {

	this.obj = obj;
	this.location = location;
	this.allowAI = allowAI;
	this.idx = idx;
	this.conditions = conditions;
	this.remark = remark;

	const EOL = '\r\n';
	const TAB = '\t';

	this.toString = function() {
		let ret = '';
		if (this.remark) {
			ret += `# -------------------- ${this.remark} ---------------------` + EOL;
		}
		ret += 'BEGIN_SOUND_ATTACHMENT' + EOL;
		ret += TAB + this.obj.toString() + EOL;
		ret += TAB + this.location.toString() + EOL;
		if (this.allowAI) {
			ret += TAB + 'EVENT_ALLOWED_FOR_AI' + EOL;
		}
		if (this.idx) {
			ret += TAB + `PARAM_DREF_IDX ${this.idx}` + EOL;
		}
		this.conditions.forEach(c => {
			ret += TAB + c.toString() + EOL
		});

		ret += 'END_SOUND_ATTACHMENT';
		return ret;
	}
}

module.exports = Attachment;