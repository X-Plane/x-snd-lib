#!/usr/bin/env node

const { Event, Snapshot } = require('./Events');
const { Engine, Tire, Cockpit, VehXYZ } = require('./VehParts');
const Attachment = require('./Attachment');
const Section = require('./Section');
const SndFile = require('./SndFile');
const Coords = require('./Coords');
const {
	CondAlways,
	CondStart,
	CondStartDelta,
	CondStartAbsDelta,
	CondEnd,
	CondEndDelta,
	CondEndAbsDelta,
	CondCommandUp,
	CondCommandDown,
	CondCommandHoldStop,
	CondCommandHoldCue
} = require('./Conditions');

const engine_0 = new Engine(0);

const { sound, snap, xyz } = require('./helpers');

let propEvent = new Attachment({
	obj: sound('/da62/engines/prop'),
	loc: engine_0,
	ai: true,
	idx: engine_0.getIndex(),
	conds: [
		new CondStartDelta('sim/bla', '==', 0),
		new CondEnd('sim/bla', '>=', 1)
	],
	remark: 'Engine!'
});

let snapshotEvent = new Attachment({
	obj: snap('/in_cockpit'),
	loc: xyz(-0.2699, 0.31676, -20.8278),
	conds: [
		new CondCommandDown('sim/bla'),
	],
	remark: 'Bla!'
});

let mySection = new Section({
	remark: 'MY COOL SECTION',
	attachments: [
		propEvent,
		snapshotEvent
		]
	},
);

let myFile = new SndFile({
	name: 'My Cool Aircraft sound bank',
	version: '1.0.0-alpha-1',
	author: "Daniela Rodriguez <dcareri@gmail.com>",
	company: 'Bla bla design',
	contents: [
		mySection,
	]
	},
);


console.log(myFile.toString());

