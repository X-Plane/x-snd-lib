function Group(directives = []) {
	if (this instanceof Group) {
		this.directives = directives;
		this.namespace = '';
	} else {
		return new Group(directives);
	}
}

Group.prototype.toString = function () {
	let ret = '';
	this.directives.forEach(directive => {
		if (!directive.namespace) {
			directive.setNamespace(this.namespace);
		}
		ret += directive.toString()
	});
	return ret;
};

Group.prototype.setNamespace = function (namespace) {
	this.namespace = namespace;
	return this
};

Group.prototype.addDirective = function (directive) {
	this.directives.push(directive);
	return this
};

module.exports = {
	Group
};