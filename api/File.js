const BaseFile = require('../lib/SndFile');

function File(directives = []) {
	if (this instanceof File) {
		this.directives = directives;
		this.name = 'X-Plane Sound File';
		this.author = null;
		this.version = '1.0.0';
		this.company = null;
	} else {
		return new File(directives);
	}
}

File.prototype = {

	toString: function () {
		return new BaseFile({
			directives: this.directives,
			name: this.name,
			author: this.author,
			version: this.version,
			company: this.company
		}).toString();
	},

	setName: function (name) {
		this.name = name;
		return this;
	},

	setAuthor: function (author) {
		this.author = author;
		return this;
	},

	setVersion: function (version) {
		this.version = version;
		return this;
	},

	setCompany: function (company) {
		this.company = company;
		return this;
	},

};

module.exports = {
	File
};