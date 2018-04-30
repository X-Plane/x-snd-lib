const { EOL, TAB } = require('./constants');

function Section({attachments = [], remark}) {

	this.attachments = attachments;
	this.remark = remark;

	this.toString = function() {
		let ret = '';
		if (this.remark) {
			ret += `# ${this.remark} ` + EOL;
			ret += `#############################################################################################` + EOL + EOL
		}
		this.attachments.forEach(attachment => {
			ret += attachment.toString() + EOL + EOL
		});

		return ret;
	}
}

module.exports = Section;