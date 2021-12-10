const { EOL, TAB } = require('./constants');

function SndFile({directives = [], name = '', author = '', version = '', company = ''}) {

	this.directives = directives;

	this.toString = function() {
		let ret = '';
		ret += 'A' + EOL + '1000' + EOL + 'ACF_SOUNDS' + EOL + EOL;
		if (name || author || version || company) {
			let maxChars = Math.max(...[name, version, author, company].flat(10).map( c => c.length));
			ret += '#'.repeat(maxChars + 10) + EOL;
			[name, version, author, company].flat(10).forEach( c => {
				if (c) {
					ret += `# ${c}${' '.repeat(maxChars + 6 - c.length)} #` + EOL;
				}
			});
			ret += '#'.repeat(maxChars + 10) + EOL ;
		}

		this.directives.forEach(directive => {
			ret += directive.toString()
		});

		return ret;
	}
}

module.exports = SndFile;