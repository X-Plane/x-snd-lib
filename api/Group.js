function Group(attachments = []) {
	if (this instanceof Group) {
		this.attachments = attachments;
		this.namespace = '';
	} else {
		return new Group(attachments);
	}
}

Group.prototype.toString = function () {
	let ret = '';
	this.attachments.forEach(attachment => {
		attachment.setNamespace(this.namespace);
		ret += attachment.toString()
	});
	return ret;
};

Group.prototype.setNamespace = function (namespace) {
	this.namespace = namespace;
	return this
};

module.exports = {
	Group
};