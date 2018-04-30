const { EOL, TAB } = require('./constants');

function SndFile({contents = [], name = '', author = '', version = '', company = ''}) {

	this.contents = contents;

	this.toString = function() {
		let ret = '';
		if (name || author || version || company) {
			let maxChars = Math.max(name.length, author.length, version.length, company.length);
			ret += '#'.repeat(maxChars + 10) + EOL;
			[name, version, author, company].forEach( c => {
				if (c) {
					ret += `# ${c}${' '.repeat(maxChars + 6 - c.length)} #` + EOL;
				}
			});
			ret += '#'.repeat(maxChars + 10) + EOL + EOL;
		}

		this.contents.forEach(content => {
			ret += content.toString() + EOL
		});

		return ret;
	}
}

module.exports = SndFile;