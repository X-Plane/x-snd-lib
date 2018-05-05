const { EOL } = require('./constants');

function Separator(remark) {

	this.remark = remark;
	this.toString = function() {
		let ret = '';
		if (this.remark) {
			ret += EOL + `# ${this.remark} ` + EOL;
		}
		ret += `#############################################################################################` + EOL;
		return ret;
	}
}

module.exports = Separator;