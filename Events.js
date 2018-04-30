function Event(name) {
	// TODO: validate against GUIDs.txt
	if (!name) {
		throw new Error('Event: Missing name');
	}
	this.name = name;
	this.toString = function() {
		return `EVENT_NAME ${this.name.trim()}`;
	}
}

function Snapshot(name) {
	// TODO: validate against GUIDs.txt
	if (!name) {
		throw new Error('Snapshot: Missing name');
	}
	this.name = name;
	this.toString = function() {
		return `SNAPSHOT_NAME ${this.name.trim()}`;
	}
}

module.exports = {
	Event,
	Snapshot
};