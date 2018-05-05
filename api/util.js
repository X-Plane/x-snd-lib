function remarkFromName(name) {
	let remark,
		parts = name.split('/');
	if (parts.length > 0) {
		remark = parts[parts.length - 1];
		remark = remark.charAt(0).toUpperCase() + remark.slice(1);
		remark = remark.replace(/_/g, ' ');
		remark = remark.replace(/-/g, ' ');
	}
	return remark;
}

module.exports = {
	remarkFromName
};