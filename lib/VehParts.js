const Coords = require('./Coords');
const {
	VEH_PART_TIRE,
	VEH_PART_ENGINE,
	VEH_PART_COCKPIT
} = require('./constants');


function VehPart(partEnum, partIdx = 0) {
	if (![VEH_PART_TIRE, VEH_PART_ENGINE, VEH_PART_COCKPIT].includes(partEnum)) {
		throw new Error('VehPart: Part enum is not valid');
	}
	this.partEnum = partEnum;
	this.partIdx = partIdx;
	this.toString = function() {
		return `VEH_PART ${this.partEnum} ${this.partIdx}`;
	};
	this.getIndex = function() {
		return this.partIdx;
	}
}

function VehXYZ(coords = new Coords(0,0,0)) {
	if (!(coords instanceof Coords)) {
		throw new Error('VehXYZ: Coordinates should be a instance of Coords');
	}
	this.coords = coords;
	this.toString = function() {
		return `VEH_XYZ ${this.coords.x.toFixed(3)} ${this.coords.y.toFixed(3)} ${this.coords.z.toFixed(3)}`;
	}
}

function VehThe(value) {
	if (value > 180 || value < -180) {
		throw new Error('VehThe: Pitch angle out of range');
	}
	this.toString = function() {
		return `VEH_THE ${value}`;
	};
}

function VehPsi(value) {
	if (value > 180 || value < -180) {
		throw new Error('VehPsi: Heading angle out of range');
	}
	this.toString = function() {
		return `VEH_PSI ${value}`;
	};
}

function VehPhi(value) {
	if (value > 180 || value < -180) {
		throw new Error('VehPhi: Bank angle out of range');
	}
	this.toString = function() {
		return `VEH_PHI ${value}`;
	};
}

function Engine(idx) { return new VehPart(VEH_PART_ENGINE, idx) }
function Tire(idx) { return new VehPart(VEH_PART_TIRE, idx) }
function Cockpit(idx) { return new VehPart(VEH_PART_COCKPIT, idx) }

module.exports = {
	VehXYZ,
	VehPart,
	VehThe,
	VehPsi,
	VehPhi,
	Cockpit,
	Tire,
	Engine
};